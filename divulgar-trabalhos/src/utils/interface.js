import { ref } from 'vue'

export const aviso = ref('')
export function informar(mensagem) { aviso.value = mensagem }
export function normalizarTexto(texto = '') {
  return String(texto).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
// Estado visual do protótipo. Não autentica usuários e não guarda senhas.
export function iniciarSessaoDemo() {
  try { localStorage.setItem('usuarioLogado', 'true') } catch { /* Armazenamento indisponível. */ }
}
export function focarBusca() {
  const campo = document.querySelector('main input[type="text"]')
  if (campo) {
    campo.scrollIntoView({ behavior: 'smooth', block: 'center' })
    campo.focus({ preventScroll: true })
  }
}
export function subirPagina() { window.scrollTo({ top: 0, behavior: 'smooth' }) }
