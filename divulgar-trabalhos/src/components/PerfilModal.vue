<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
defineProps({ profissional: { type: Object, required: true } })
const emit = defineEmits(['fechar'])
const fecharBotao = ref(null)
let focoAnterior
function aoTeclar(evento) {
  if (evento.key === 'Escape') emit('fechar')
  if (evento.key === 'Tab') { evento.preventDefault(); fecharBotao.value?.focus() }
}
onMounted(() => {
  focoAnterior = document.activeElement
  fecharBotao.value?.focus()
  document.addEventListener('keydown', aoTeclar)
})
onUnmounted(() => {
  document.removeEventListener('keydown', aoTeclar)
  if (focoAnterior?.isConnected) focoAnterior.focus()
})
</script>
<template>
  <div class="fixed inset-0 z-[100] bg-slate-900/50 flex items-center justify-center p-4" @click.self="$emit('fechar')">
    <section role="dialog" aria-modal="true" aria-labelledby="nome-profissional" class="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-xl">
      <img :src="profissional.imagem" :alt="profissional.nome" class="w-24 h-24 object-cover rounded-2xl mb-4" />
      <h2 id="nome-profissional" class="text-lg font-extrabold text-slate-800">{{ profissional.nome }}</h2>
      <p class="text-sm text-slate-600 mt-1">{{ profissional.profissao }}</p>
      <p class="text-sm mt-4">⭐ {{ profissional.avaliacao }} ({{ profissional.avaliacoes }} avaliações)</p>
      <p class="text-sm mt-2">📍 {{ profissional.bairro }}</p>
      <p class="text-sm mt-2">{{ profissional.disponibilidade }}</p>
      <p class="text-sm mt-2">{{ profissional.especialidades?.join(' • ') }}</p>
      <p class="text-xs text-slate-500 mt-4">Perfil demonstrativo. Não realiza contratação ou agendamento.</p>
      <button ref="fecharBotao" type="button" class="w-full mt-5 rounded-xl bg-[#D94E1E] p-3 font-bold text-white" @click="$emit('fechar')">Fechar perfil</button>
    </section>
  </div>
</template>
