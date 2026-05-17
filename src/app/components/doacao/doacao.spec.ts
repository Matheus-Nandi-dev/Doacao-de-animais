import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoacaoComponent } from './doacao';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('DoacaoComponent', () => {
  let component: DoacaoComponent;
  let fixture: ComponentFixture<DoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoacaoComponent, FormsModule, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.formulario.especie).toBe('cachorro');
    expect(component.formulario.genero).toBe('macho');
  });

  it('should validate required fields', () => {
    component.formulario.nome = '';
    component.enviarDoacao();
    expect(component.erro).toBe(true);
    expect(component.mensagemErro).toContain('Nome do animal');
  });

  it('should validate email format', () => {
    component.formulario.nome = 'Max';
    component.formulario.raca = 'Poodle';
    component.formulario.idade = 'adulto';
    component.formulario.descricao = 'Animal saudável';
    component.formulario.cidade = 'São Paulo';
    component.formulario.nomeDoador = 'João';
    component.formulario.telefoneDoador = '11999999999';
    component.formulario.emailDoador = 'invalid-email';
    component.formulario.motivoDacao = 'Mudança';

    component.enviarDoacao();
    expect(component.erro).toBe(true);
    expect(component.mensagemErro).toContain('Email');
  });

  it('should clear form on limparForm', () => {
    component.formulario.nome = 'Max';
    component.formulario.nomeDoador = 'João';
    component.limparForm();

    expect(component.formulario.nome).toBe('');
    expect(component.formulario.nomeDoador).toBe('');
    expect(component.imagemPreview).toBeNull();
  });
});
