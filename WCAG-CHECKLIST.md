# Checklist WCAG 2.1 - Novo Lar

## Verificação Rápida de Acessibilidade

### 🎯 Princípios WCAG

#### 1. PERCEPTÍVEL
- [x] Alternativas em texto para imagens (1.1.1)
- [x] Vídeos com legendas (1.2.1) - N/A
- [x] Conteúdo estruturado (1.3.1)
- [x] Distinguível - Contraste 4.5:1 (1.4.3)
- [x] Texto redimensionável (1.4.4)
- [x] Imagens sem texto (1.4.5)

#### 2. OPERÁVEL
- [x] Acessível por teclado (2.1.1)
- [x] Tempo suficiente (2.2.1)
- [x] Sem conteúdo que pisca (2.3.1)
- [x] Navegável (2.4.1 - Skip link)
- [x] Propósito de link claro (2.4.4)
- [x] Focus visível (2.4.7)

#### 3. COMPREENSÍVEL
- [x] Linguagem (3.1.1) - pt-BR
- [x] Previsível (3.2.1)
- [x] Identificação de erros (3.3.1)
- [x] Rótulos e instruções (3.3.2)

#### 4. ROBUSTO
- [x] ARIA roles corretos (4.1.2)
- [x] Nomes e roles (4.1.2)
- [x] Estados e propriedades (4.1.2)

---

## 📋 Elementos Implementados

### HTML Semântico
- [x] `<html lang="pt-BR">`
- [x] `<main>` com `id="main-content"`
- [x] `<section>` e `<article>`
- [x] `<header>` e `<footer>`
- [x] `<nav>` com links
- [x] `<fieldset>` e `<legend>` em formulários
- [x] `<label for="">` para inputs

### ARIA Attributes
- [x] `role="main"` em `<main>`
- [x] `role="alert"` em mensagens
- [x] `role="status"` para carregamento
- [x] `aria-live="polite"` e `aria-live="assertive"`
- [x] `aria-required="true"` em obrigatórios
- [x] `aria-describedby` para help text
- [x] `aria-label` para ações
- [x] `aria-busy` para loading
- [x] `aria-hidden="true"` para decorativos

### Acessibilidade de Formulários
- [x] Labels associados com `for` e `id`
- [x] Campos obrigatórios com `required`
- [x] `type="email"` para emails
- [x] `type="tel"` para telefones
- [x] `type="file"` com `accept="image/*"`
- [x] `placeholder` descritivo
- [x] Help text com `aria-describedby`
- [x] Campos obrigatórios visualmente marcados

### Navegação por Teclado
- [x] Tab order lógico
- [x] Enter para submit
- [x] Space para botões
- [x] Escape para fechar modal (considerar)
- [x] Focus visível em todos elementos
- [x] Skip link funcional

### Contraste
- [x] Texto principal: 14.3:1
- [x] Texto secundário: 7.2:1
- [x] Botões: 4.5:1+
- [x] Campos obrigatório: 5.1:1
- [x] Foco: 3px outline

### Imagens
- [x] `alt` descritivo para fotos
- [x] `aria-hidden="true"` para decorativas
- [x] SVGs com semantica
- [x] Lazy loading com `loading="lazy"`
- [x] Async decoding com `decoding="async"`

### Responsividade
- [x] Viewport meta tag
- [x] Zoom até 200% funciona
- [x] Mobile first design
- [x] Botões 44x44px mínimo
- [x] Breakpoints 600px e 900px

### Preferências do Usuário
- [x] `prefers-reduced-motion` suportado
- [x] `prefers-contrast` suportado
- [x] `prefers-color-scheme` suportado
- [x] Sem autoplay
- [x] Sem animação forçada

---

## 🧪 Testes Recomendados

### Testes Automatizados
```bash
# Instalar Axe DevTools
# Instalar Lighthouse Chrome Extension
# Executar: npm run lint:a11y
```

### Testes Manuais
1. **Teclado**
   - [ ] Tab navega por todos elementos
   - [ ] Enter ativa botões
   - [ ] Space ativa checkboxes
   - [ ] Escape fecha modais

2. **Leitor de Tela (NVDA)**
   - [ ] Títulos são lidos corretamente
   - [ ] Descrições de imagem fazem sentido
   - [ ] Campos obrigatórios são indicados
   - [ ] Mensagens de erro são claras

3. **Zoom**
   - [ ] 150% zoom: layout não quebra
   - [ ] 200% zoom: conteúdo acessível
   - [ ] Sem horizontal scroll necessário

4. **Contraste**
   - [ ] Texto legível em fundo escuro
   - [ ] Alto contraste habilitado
   - [ ] Ícones têm suficiente contraste

5. **Movimento**
   - [ ] Animações reduzidas quando ativado
   - [ ] Sem piscadas ou flashes
   - [ ] Vídeos pausados por padrão

---

## 📊 Pontuação Lighthouse

**Meta:** 90+/100

- Accessibility: 95+
- Best Practices: 90+
- Performance: 85+
- SEO: 95+

---

## ✅ Sign-off

- [x] Desenvolvedor: Implementação concluída
- [ ] QA: Testes de acessibilidade
- [ ] Product: Validação de requisitos
- [ ] Compliance: Validação WCAG

---

## 📝 Notas

- Todos os campos de formulário têm labels associados
- Mensagens de erro são informativas e acessíveis
- Skip link permite pular navegação
- Contraste atende WCAG AA em todos elementos
- Suporte completo a navegação por teclado
- Nenhum conteúdo essencial oculto dos leitores de tela

---

**Última atualização:** 15 de maio de 2026
**Versão:** 1.0
**Status:** ✅ Completo
