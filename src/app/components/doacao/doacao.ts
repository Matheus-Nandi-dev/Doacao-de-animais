import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalService } from '../../services/animal';

interface FormularioDoacaoAnimal {
  nome: string;
  especie: string;
  raca: string;
  idade: string;
  genero: string;
  descricao: string;
  cidade: string;
  nomeDoador: string;
  telefoneDoador: string;
  emailDoador: string;
  motivoDacao: string;
  imagem?: File;
}

@Component({
  selector: 'app-doacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doacao.html',
  styleUrl: './doacao.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoacaoComponent implements OnInit {
  loading = false;
  enviado = false;
  erro = false;
  mensagemErro = '';
  imagemPreview: string | null = null;
  
  formulario: FormularioDoacaoAnimal = {
    nome: '',
    especie: 'cachorro',
    raca: '',
    idade: '',
    genero: 'macho',
    descricao: '',
    cidade: '',
    nomeDoador: '',
    telefoneDoador: '',
    emailDoador: '',
    motivoDacao: '',
  };

  especies = [
    { valor: 'cachorro', nome: 'Cachorro' },
    { valor: 'gato', nome: 'Gato' },
    { valor: 'coelho', nome: 'Coelho' },
    { valor: 'pássaro', nome: 'Pássaro' },
    { valor: 'outro', nome: 'Outro' },
  ];

  generos = [
    { valor: 'macho', nome: 'Macho' },
    { valor: 'femea', nome: 'Fêmea' },
  ];

  idadesOptions = [
    { valor: 'filhote', nome: 'Filhote (0-1 ano)' },
    { valor: 'adulto', nome: 'Adulto (1-7 anos)' },
    { valor: 'idoso', nome: 'Idoso (7+ anos)' },
  ];

  private readonly router = inject(Router);
  private readonly animalService = inject(AnimalService);

  ngOnInit(): void {
    // Inicialização do componente
  }

  onImagemSelecionada(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.formulario.imagem = file;

      // Criar preview
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagemPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  limparForm(): void {
    this.formulario = {
      nome: '',
      especie: 'cachorro',
      raca: '',
      idade: '',
      genero: 'macho',
      descricao: '',
      cidade: '',
      nomeDoador: '',
      telefoneDoador: '',
      emailDoador: '',
      motivoDacao: '',
    };
    this.imagemPreview = null;
  }

  enviarDoacao(): void {
    // Validação básica
    if (!this.validarForm()) {
      return;
    }

    this.loading = true;
    this.erro = false;
    this.mensagemErro = '';

    // Simular envio (em produção, seria uma chamada HTTP real)
    setTimeout(() => {
      this.loading = false;
      this.enviado = true;
      this.limparForm();

      // Voltar à página inicial após 3 segundos
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);
    }, 1500);
  }

  private validarForm(): boolean {
    if (!this.formulario.nome.trim()) {
      this.erro = true;
      this.mensagemErro = 'Nome do animal é obrigatório';
      return false;
    }

    if (!this.formulario.raca.trim()) {
      this.erro = true;
      this.mensagemErro = 'Raça do animal é obrigatória';
      return false;
    }

    if (!this.formulario.idade) {
      this.erro = true;
      this.mensagemErro = 'Idade do animal é obrigatória';
      return false;
    }

    if (!this.formulario.descricao.trim()) {
      this.erro = true;
      this.mensagemErro = 'Descrição do animal é obrigatória';
      return false;
    }

    if (!this.formulario.cidade.trim()) {
      this.erro = true;
      this.mensagemErro = 'Cidade é obrigatória';
      return false;
    }

    if (!this.formulario.nomeDoador.trim()) {
      this.erro = true;
      this.mensagemErro = 'Seu nome é obrigatório';
      return false;
    }

    if (!this.formulario.telefoneDoador.trim()) {
      this.erro = true;
      this.mensagemErro = 'Seu telefone é obrigatório';
      return false;
    }

    if (!this.formulario.emailDoador.trim() || !this.validarEmail(this.formulario.emailDoador)) {
      this.erro = true;
      this.mensagemErro = 'Email válido é obrigatório';
      return false;
    }

    if (!this.formulario.motivoDacao.trim()) {
      this.erro = true;
      this.mensagemErro = 'Motivo da doação é obrigatório';
      return false;
    }

    return true;
  }

  private validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  fecharMensagem(): void {
    this.enviado = false;
    this.erro = false;
    this.mensagemErro = '';
  }
}
