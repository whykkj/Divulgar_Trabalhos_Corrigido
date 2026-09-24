<script setup>
import { onMounted, onUnmounted, watch, nextTick, ref } from 'vue'
import { aviso } from './utils/interface'
const fecharBotao = ref(null)
let focoAnterior = null
watch(aviso, async (valor) => {
  if (valor) {
    focoAnterior = document.activeElement
    await nextTick()
    fecharBotao.value?.focus()
  } else if (focoAnterior?.isConnected) focoAnterior.focus()
})
function aoTeclar(evento) {
  if (!aviso.value) return
  if (evento.key === 'Escape') aviso.value = ''
  if (evento.key === 'Tab') { evento.preventDefault(); fecharBotao.value?.focus() }
}
onMounted(() => document.addEventListener('keydown', aoTeclar))
onUnmounted(() => document.removeEventListener('keydown', aoTeclar))
</script>

<template>
  <RouterView />
  <div v-if="aviso" class="fixed inset-0 z-[200] bg-slate-900/50 flex items-center justify-center p-4" @click.self="aviso = ''">
    <section role="dialog" aria-modal="true" aria-labelledby="titulo-aviso" class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 id="titulo-aviso" class="text-lg font-bold text-slate-800">Divulgar Trabalhos</h2>
      <p class="mt-3 text-sm text-slate-600">{{ aviso }}</p>
      <button ref="fecharBotao" type="button" class="mt-5 w-full rounded-xl bg-[#D94E1E] p-3 font-bold text-white" @click="aviso = ''">Entendi</button>
    </section>
  </div>
</template>
