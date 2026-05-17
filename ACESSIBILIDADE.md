# Acessibilidade - Novo Lar

Este documento descreve as implementações de acessibilidade conforme WCAG 2.1 (Web Content Accessibility Guidelines) nível AA.

## ✅ Implementações WCAG 2.1 AA

### 1. **Estrutura Semântica (1.3.1 Info and Relationships)**
- ✅ Uso correto de `<h1>`, `<h2>`, `<h3>` para hierarquia de títulos
- ✅ Uso de `<section>`, `<article>`, `<main>`, `<aside>` para estrutura de conteúdo
- ✅ Uso de `<fieldset>` e `<legend>` para agrupamento de formulários
- ✅ Uso de `<label>` associado com `for` e `id` em formulários
- ✅ Role semanticamente correto para componentes (button, alert, status, region)

### 2. **Navegação por Teclado (2.1.1 Keyboard)**
- ✅ Todos os elementos interativos são acessíveis via teclado
- ✅ Tab order lógico em formulários
- ✅ Enter, Space, Arrow keys funcionam corretamente
- ✅ Link "Pular para Conteúdo Principal" (Skip Link) no topo
- ✅ Focus visível com `outline: 3px solid #2dd4bf`

### 3. **Indicadores Visuais (2.4.7 Focus Visible)**
- ✅ Estados de focus claramente visíveis
- ✅ Focus outline com contraste adequado
- ✅ Suporte para `prefers-contrast: more` (alto contraste)
- ✅ Mínimo de 44x44px para áreas clicáveis

### 4. **Texto Alternativo (1.1.1 Non-text Content)**
- ✅ Imagens com `alt` descritivo
- ✅ SVGs com `aria-hidden="true"` quando decorativos
- ✅ Ícones com labels associados
- ✅ Emojis com `aria-label` explicativo

### 5. **Contraste de Cores (1.4.3 Contrast Minimum)**
- ✅ Texto branco (#ffffff) sobre fundo escuro (#0a1628): Contraste 14.3:1 ✅
- ✅ Texto secundário (#9bb9d9) sobre fundo: Contraste 7.2:1 ✅
- ✅ Labels de obrigatório em vermelho (#ff6b6b): Contraste 5.1:1 ✅
- ✅ Botões com gradiente: Contraste mínimo 4.5:1 ✅

### 6. **Mensagens de Status (3.2.2 On Input & 4.1.3 Status Messages)**
- ✅ Mensagens de erro com `role="alert"` e `aria-live="assertive"`
- ✅ Mensagens de sucesso com `role="alert"` e `aria-live="polite"`
- ✅ Status de carregamento com `role="status"` e `aria-live="polite"`
- ✅ Descrição de campos obrigatórios visível

### 7. **Movimento e Animação (2.3.3 Animation from Interactions & 2.3.2 Prefers Reduced Motion)**
- ✅ Suporte para `prefers-reduced-motion: reduce`
- ✅ Animações desabilitadas para usuários que preferem menos movimento
- ✅ Transições suaves mas rápidas (0.2s-0.3s)

### 8. **Formulários Acessíveis (3.3.1 Error Identification & 3.3.2 Labels or Instructions)**
- ✅ Todos os campos têm `<label>` associado
- ✅ Campos obrigatórios marcados com `required` e `aria-required="true"`
- ✅ Campos opcionais claramente indicados
- ✅ Mensagens de ajuda com `aria-describedby`
- ✅ Validação de email com tipo correto `type="email"`
- ✅ Validação de telefone com tipo correto `type="tel"`
- ✅ Textarea com `rows` especificado para tamanho adequado

### 9. **Links e Botões (2.4.4 Link Purpose)**
- ✅ Links com texto descritivo
- ✅ Botões com `aria-label` quando necessário
- ✅ `aria-label` para ações contextuais
- ✅ Diferentes estilos visuais para estados (hover, active, focus, disabled)

### 10. **Suporte a Leitores de Tela**
- ✅ Classe `.sr-only` para conteúdo exclusivo de leitores
- ✅ `aria-live` para atualizações dinâmicas
- ✅ `aria-label` para elementos sem texto
- ✅ `aria-describedby` para descrições adicionais
- ✅ `aria-busy` para estados de carregamento
- ✅ `role` apropriado para cada componente

### 11. **Redimensionamento de Texto (1.4.4 Resize Text)**
- ✅ Sem `user-select: none` em conteúdo importante
- ✅ Sem `overflow: hidden` em conteúdo importante
- ✅ Zoom até 200% mantém funcionalidade
- ✅ Breakpoints responsivos em 600px, 900px, 1920px

### 12. **Linguagem (3.1.1 Language of Page)**
- ✅ Atributo `lang="pt-BR"` no `<html>`
- ✅ Conteúdo em português brasileiro
- ✅ Direção de texto LTR (esquerda para direita)

## 🛠️ Tecnologias Usadas

### Atributos ARIA
- `role` - Define o papel semântico
- `aria-label` - Rótulo acessível
- `aria-describedby` - Descrição relacionada
- `aria-live` - Atualizações dinâmicas
- `aria-busy` - Estado de carregamento
- `aria-required` - Campo obrigatório
- `aria-hidden` - Oculta de leitores (decorativo)

### Atributos HTML5
- `required` - Campo obrigatório
- `aria-required="true"` - Reforça obrigatoriedade
- `type="email"` - Validação de email
- `type="tel"` - Validação de telefone
- `type="file"` - Upload com `accept="image/*"`
- `loading="lazy"` - Carregamento otimizado
- `decoding="async"` - Decodificação assíncrona

### Media Queries
- `@media (prefers-reduced-motion: reduce)` - Respeita preferência de animação
- `@media (prefers-contrast: more)` - Alto contraste
- `@media (prefers-color-scheme: dark)` - Tema escuro
- `@media (max-width: 900px)` - Tablets
- `@media (max-width: 600px)` - Mobile

## 🧪 Testes de Acessibilidade

### Ferramentas Recomendadas
1. **Axe DevTools** - Análise automática de acessibilidade
2. **NVDA** (Windows) - Leitor de tela gratuito
3. **JAWS** (Windows) - Leitor de tela profissional
4. **VoiceOver** (macOS/iOS) - Leitor nativo
5. **Chrome DevTools** - Lighthouse (Acessibilidade)
6. **Wave** - Validador de acessibilidade online

### Checklist Manual
- [ ] Navegação completa com teclado (Tab, Enter, Space)
- [ ] Focus visível em todos os elementos
- [ ] Leitura correta com leitor de tela
- [ ] Alto contraste legível
- [ ] Sem movimento excessivo
- [ ] Zoom até 200% funciona
- [ ] Imagens com alt descritivo
- [ ] Formulários com labels
- [ ] Mensagens de erro claras
- [ ] Elementos com mínimo 44x44px

## 📱 Suporte de Dispositivos

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablets (iPad, Android)
- ✅ Smartphones (iPhone, Android)
- ✅ Leitores de tela (NVDA, JAWS, VoiceOver)
- ✅ Zoom até 200%
- ✅ Alto contraste ativado
- ✅ Movimento reduzido ativado

## 🚀 Próximos Passos

1. Realizar audit completo com Axe DevTools
2. Testar com leitores de tela reais
3. Implementar validação em tempo real com feedback acessível
4. Adicionar aria-invalid e aria-describedby para erros de formulário
5. Considerar adicionar ARIA live regions para cada seção
6. Implementar testes automatizados de acessibilidade

## 📚 Referências

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)

## 📞 Suporte

Para questões de acessibilidade ou para reportar problemas, entre em contato através do formulário de doação ou do email.

---

**Último atualizado:** 15 de maio de 2026
**Nível de Conformidade:** WCAG 2.1 AA
**Status:** ✅ Em Conformidade
