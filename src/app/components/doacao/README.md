# Página de Doação de Animais

## Descrição
Página desenvolvida para permitir que o público doe seus animais de estimação, registrando todas as informações necessárias para facilitar o processo de reabilitação e adoção.

## Estrutura dos Arquivos

### 1. **doacao.ts** - Componente TypeScript
- **Funcionalidades:**
  - Formulário reativo com validação completa
  - Gerenciamento de estado (loading, enviado, erro)
  - Upload e preview de imagens
  - Validação de email
  - Redirecionamento automático após sucesso

- **Interface FormularioDoacaoAnimal:**
  - `nome`: Nome do animal
  - `especie`: Tipo de animal (cachorro, gato, coelho, pássaro, outro)
  - `raca`: Raça do animal
  - `idade`: Faixa etária (filhote, adulto, idoso)
  - `genero`: Gênero (macho, fêmea)
  - `descricao`: Descrição do animal
  - `cidade`: Localização do animal
  - `nomeDoador`: Nome do doador
  - `telefoneDoador`: Contato do doador
  - `emailDoador`: Email do doador
  - `motivoDacao`: Motivo da doação
  - `imagem`: Foto do animal (opcional)

### 2. **doacao.html** - Template HTML
- Estrutura semântica com seções bem definidas
- Hero section com título e descrição
- Formulário em 2 seções principais:
  1. Informações do Animal
  2. Dados de Contato do Doador
- Campos com validação visual
- Suporte a upload de imagem com preview
- Mensagens de sucesso e erro com feedback ao usuário
- Responsivo para dispositivos móveis

### 3. **doacao.css** - Estilos
- Design moderno com degradados e efeitos de vidro
- Tema escuro (match com o resto da aplicação)
- Animações suaves (slideIn, hover effects)
- Cores primárias: Teal (#2dd4bf), Azul escuro (#0a223f)
- Responsivo em 3 breakpoints:
  - Desktop: 900px+
  - Tablet: 601px-900px
  - Mobile: até 600px

### 4. **doacao.spec.ts** - Testes Unitários
- Teste de criação do componente
- Validação de valores padrão
- Testes de validação de campos obrigatórios
- Teste de validação de email
- Teste de limpeza do formulário

## Rota
- **Path:** `/doacao`
- **Componente:** DoacaoComponent

## Integração com Header
O link "Doar" foi adicionado ao header da aplicação com:
- Ícone de estrela
- Rótulo "Doar"
- Comportamento ativo/inativo baseado em rota

## Validações Implementadas
1. ✅ Nome do animal é obrigatório
2. ✅ Raça é obrigatória
3. ✅ Idade é obrigatória
4. ✅ Descrição é obrigatória
5. ✅ Cidade é obrigatória
6. ✅ Nome do doador é obrigatório
7. ✅ Telefone do doador é obrigatório
8. ✅ Email do doador é obrigatório e válido
9. ✅ Motivo da doação é obrigatório

## Funcionalidades Extras
- 📷 **Preview de Imagem**: Visualizar a foto do animal antes de enviar
- 🗑️ **Limpar Formulário**: Botão para resetar todos os campos
- ⏳ **Estado de Carregamento**: Feedback visual durante o envio
- ✅ **Sucesso com Redirecionamento**: Volta para home após 3 segundos
- 🎨 **Tema Consistente**: Segue o design da aplicação
- 📱 **Totalmente Responsivo**: Funciona em todos os dispositivos

## Como Usar
1. Acesse `/doacao` através do menu de navegação ou digitando a URL
2. Preencha todos os campos obrigatórios (marcados com *)
3. Adicione uma foto do animal (opcional)
4. Clique em "Registrar Doação"
5. Após validação bem-sucedida, você será redirecionado

## Próximas Melhorias Sugeridas
- [ ] Integração com API backend para persistência de dados
- [ ] Envio de email de confirmação
- [ ] Validação de CPF/CNPJ do doador
- [ ] Integração com Google Maps para localização
- [ ] Histórico de doações do usuário
- [ ] Sistema de avaliação de doadores
- [ ] Notificações em tempo real sobre interessados
