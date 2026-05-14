import uuid #importação da biblioteca uuid, que é usada para gerar identificadores únicos para os animais cadastrados
import os #importação da biblioteca os, que é usada para verificar a existência do arquivo doacao.json antes de tentar ler os dados
import json
from urllib.parse import urlparse
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def carregar():
    with open("doacao.json", "r", encoding="utf-8") as f:
        return json.load(f)
    
def salvar(animal): 
    with open("doacao.json", "w", encoding="utf-8") as f:
        json.dump(animal, f, indent=4, ensure_ascii=False)

@app.get("/animais/<id>") # localhost/animais/(id do animal)
def get_animal_por_id(id): #essa função é para buscar um animal específico pelo seu id, ela lê os dados do arquivo doacao.json e procura pelo animal com o id correspondente, se encontrar, retorna os dados do animal em formato json, caso contrário, retorna uma mensagem de erro indicando que o animal não foi encontrado
    animais = carregar() #carrega a lista de animais do arquivo doacao.json usando a função carregar(), que lê os dados do arquivo e retorna uma lista de animais
    for animal in animais:
        if animal.get("id") == id: #verifica se o id do animal atual na iteração é igual ao id fornecido na URL, se for, retorna os dados do animal em formato json com status 200 (OK)
            return jsonify(animal), 200
    return jsonify({"mensagem": "Animal não encontrado"}), 404

arquivo = "doacao.json" #variável que armazena o nome do arquivo json onde os dados dos animais serão salvos, isso facilita a manutenção do código, pois se for necessário mudar o nome do arquivo, basta alterar essa variável em um único lugar
 

def carregar_animais():
    if not os.path.exists(arquivo): #evitar erros ao tentar ler um arquivo que não existe, se o arquivo doacao.json não existir, a função retorna uma lista vazia, indicando que não há animais cadastrados no momento
        return []
    try:
        with open(arquivo, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError): #trata possíveis erros que podem ocorrer ao tentar ler o arquivo doacao.json, como um erro de decodificação JSON (se o arquivo estiver corrompido ou não for um JSON válido) ou um erro de arquivo não encontrado (se o arquivo for excluído entre a verificação de existência e a tentativa de leitura), se ocorrer algum desses erros, a função retorna uma lista vazia, indicando que não há animais cadastrados ou que os dados não puderam ser carregados corretamente
        return []
 
 
def salvar_animais(animais): #responsável por salvar a lista de animais no arquivo doacao.json, ela recebe a lista de animais como parâmetro e escreve os dados no arquivo usando json.dump, o parâmetro indent=4 é usado para formatar o JSON com uma indentação de 4 espaços, tornando-o mais legível, e ensure_ascii=False permite que caracteres acentuados sejam salvos corretamente no arquivo
    with open(arquivo, "w", encoding="utf-8") as f:
        json.dump(animais, f, indent=4, ensure_ascii=False)


def url_imagem_valida(url):
    if not isinstance(url, str):
        return False
    url = url.strip() #strip() é um método de string que remove os espaços em branco do início e do final da string, isso é útil para garantir que a URL seja validada corretamente mesmo que o usuário tenha inserido acidentalmente espaços extras antes ou depois da URL, evitando erros de validação devido a espaços em branco indesejados
    if not url:
        return True

    parsed = urlparse(url)
    return parsed.scheme in ("http", "https") and bool(parsed.netloc)
 
 

@app.post("/animal")
def criar_animal():
    dados = request.json

    campos_int = ["idade"]
    campos_str = ["nome", "especie", "cidade", "genero"]

    if not dados or not isinstance(dados, dict):
        return jsonify({"mensagem": "Corpo da requisição deve ser um objeto JSON"}), 400

    campos_obrigatorios = ["especie", "idade", "nome", "cidade", "genero"]
    for campo in campos_obrigatorios:
        if campo not in dados or dados[campo] is None:
            return jsonify({"mensagem": f"Campo '{campo}' é obrigatório"}), 400


    if not isinstance(dados.get("idade"), int):
        return jsonify({"mensagem": f"Campo {campos_int} deve ser um número inteiro"}), 422
    for campo in ["nome", "especie", "cidade", "genero"]:
        if not isinstance(dados.get(campo), str):
            return jsonify({"mensagem": f"Campo {campos_str} deve ser uma string"}), 422

    if "imagem" in dados and dados.get("imagem") is not None:
        if not isinstance(dados.get("imagem"), str):
            return jsonify({"mensagem": "Campo 'imagem' deve ser uma string (URL da foto)"}), 422
        if not url_imagem_valida(dados.get("imagem")):
            return jsonify({"mensagem": "Campo 'imagem' deve ser uma URL válida (http/https)"}), 422

    if "imagem" not in dados:
        dados["imagem"] = ""

    animais = carregar_animais()
    dados["id"] = str(uuid.uuid4())
    animais.append(dados)
    salvar_animais(animais)

    return jsonify({"mensagem": "Animal cadastrado com sucesso!", "animal": dados}), 201
 

@app.post("/animais/lote") #cadastra vários animais de uma vez, ela recebe uma lista de animais no corpo da requisição e salva todos eles no arquivo doacao.json, a função verifica se o corpo da requisição é uma lista de objetos json, se cada objeto possui os campos obrigatórios e se são do tipo correto, e então salva os animais válidos no arquivo
def criar_animais_lote():
    dados = request.json
 
    if not dados or not isinstance(dados, list):
        return jsonify({"mensagem": "Envie uma lista de animais"}), 400
 
    animais = carregar_animais() #carrega a lista de animais existente do arquivo doacao.json para garantir que os novos animais sejam adicionados à lista existente, em vez de sobrescrever os dados anteriores
    inseridos = [] #lista para armazenar os animais que foram inseridos com sucesso
    campos_obrigatorios = ["especie", "idade", "nome", "cidade", "genero"]
 
    campos_int = ["idade"]
    campos_str = ["nome", "especie", "cidade", "genero"]

    for item in dados:
        if not isinstance(item, dict): #verifica se cada item da lista é um dicionário, se não for, retorna erro
            return jsonify({"mensagem": "Cada animal deve ser um objeto JSON"}), 400
        if not all(item.get(c) is not None for c in campos_obrigatorios):
            return jsonify({"mensagem": "Todos os campos obrigatórios devem ser preenchidos"}), 400
        # Validação de tipos para cada animal individualmente
        for campo in campos_int:
            if not isinstance(item.get(campo), int):
                return jsonify({"mensagem": f"Campo '{campo}' deve ser um inteiro para o animal '{item.get('nome', '')}'"}), 422
        for campo in campos_str:
            if not isinstance(item.get(campo), str):
                return jsonify({"mensagem": f"Campo '{campo}' deve ser uma string para o animal '{item.get('nome', '')}'"}), 422

        if "imagem" in item and item.get("imagem") is not None:
            if not isinstance(item.get("imagem"), str):
                return jsonify({"mensagem": f"Campo 'imagem' deve ser uma string para o animal '{item.get('nome', '')}'"}), 422
            if not url_imagem_valida(item.get("imagem")):
                return jsonify({"mensagem": f"Campo 'imagem' deve ser uma URL válida (http/https) para o animal '{item.get('nome', '')}'"}), 422

        if "imagem" not in item:
            item["imagem"] = ""

        item["id"] = str(uuid.uuid4()) 
        animais.append(item)
        inseridos.append(item)

    salvar_animais(animais) #salva a lista de animais atualizada no arquivo doacao.json

    return jsonify({"mensagem": f"{len(inseridos)} animais cadastrados!", "animais": inseridos}), 201 #retorna uma resposta json indicando quantos animais foram cadastrados com sucesso e inclui a lista dos animais que foram inseridos

@app.get("/animal") #essa função é para listar os animais cadastrados, ela lê os dados do arquivo doacao.json e retorna a lista de animais em formato json, se o arquivo não existir ou estiver vazio, ela retorna uma lista vazia
def listar_animais_fixos():
    animal = [
        {"idade": "5 meses", "nome": "Rex",   "especie": "hamster",  "cidade": "Toledo"},
        {"idade": "2 anos",  "nome": "Mariê", "especie": "gato",     "cidade": "Toledo"},
        {"idade": "5 anos",  "nome": "Thor",  "especie": "cachorro", "cidade": "Toledo"},
    ]
    return jsonify(animal), 200
 




@app.get("/animais") 
def listar_animais():
    animais = carregar()

    genero = request.args.get("genero") #http://localhost:5000/animais?genero=feminino 
    especie = request.args.get("especie") #http://localhost:5000/animais?especie=gato
    cidade = request.args.get("cidade") #http://localhost:5000/animais?cidade=Toledo
    idade = request.args.get("idade") #http://localhost:5000/animais?idade=5%20anos
    
    resultado = []
    
    for animal in animais:
        if genero and str(animal.get("genero", "")).lower() != genero.lower():
            continue
        if especie and str(animal.get("especie", "")).lower() != especie.lower():
            continue
        if cidade and str(animal.get("cidade", "")).lower() != cidade.lower():
            continue
        if idade and str(animal.get("idade", "")) != str(idade):
            continue
        resultado.append(animal)

    if resultado:
        return jsonify(resultado), 200
    return jsonify({"mensagem": "Nenhum animal encontrado com os filtros fornecidos"}), 404

@app.put("/animais/<id>")
def atualizar_animais(id):
    animais = carregar()
    dados = request.json
    #validação dos dados recebidos para garantir que os campos obrigatórios estejam presentes e sejam do tipo correto, isso ajuda a evitar erros ao tentar atualizar um animal com dados inválidos
    campos_obrigatorios = ["especie", "idade", "nome", "cidade", "genero"]
    for campo in campos_obrigatorios:
        if campo not in dados or dados[campo] is None:
            return jsonify({"mensagem": f"Campo '{campo}' é obrigatório"}), 400

    if "imagem" in dados and dados.get("imagem") is not None:
        if not isinstance(dados.get("imagem"), str):
            return jsonify({"mensagem": "Campo 'imagem' deve ser uma string (URL da foto)"}), 422
        if not url_imagem_valida(dados.get("imagem")):
            return jsonify({"mensagem": "Campo 'imagem' deve ser uma URL válida (http/https)"}), 422

    for animal in animais:
        if str(animal.get("id")) == str(id):
            animal.update(dados)
            salvar(animais)
            return jsonify({"mensagem": "Animal atualizado com sucesso!", "animal": animal}), 200

    return jsonify({"mensagem": "Animal não encontrado"}), 404

@app.delete("/animais/<id>")
def deletar_animal(id):
    animais = carregar()
    for animal in animais:
        if str(animal.get("id")) == str(id):
            animais.remove(animal)
            salvar(animais)
            return jsonify({"mensagem": "Animal deletado com sucesso!"}), 204 #204 No Content é um código de status HTTP que indica que a solicitação foi bem-sucedida, mas não há conteúdo para retornar na resposta, isso é apropriado para operações de exclusão, onde o recurso foi removido com sucesso e não há necessidade de retornar dados adicionais

    return jsonify({"mensagem": "Animal não encontrado"}), 404



if __name__ == "__main__": #verifica se o script está sendo executado diretamente (em vez de importado como um módulo), e se for o caso, inicia o servidor Flask em modo de depuração, o que permite que o servidor seja reiniciado automaticamente sempre que houver mudanças no código, facilitando o desenvolvimento e a depuração
    app.run(debug=True)