<script setup>
import { informar } from '../utils/interface'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const profissao = ref('')
const categoria = ref('')
const descricao = ref('')
const bairro = ref('')
const telefone = ref('')
const servicos = ref('')
const disponibilidade = ref('')

const erro = ref('')
const salvando = ref(false)
try {
  const rascunho = JSON.parse(localStorage.getItem('perfilEmpreendedorRascunho') || '{}')
  for (const [chave, campo] of Object.entries({ profissao, categoria, descricao, bairro, telefone, servicos, disponibilidade })) {
    if (typeof rascunho?.[chave] === 'string') campo.value = rascunho[chave]
  }
} catch { /* Rascunho ausente ou inválido: mantém o formulário vazio. */ }

function salvarPerfil() {
  if (salvando.value) return
  erro.value = ''

  if (
    !profissao.value.trim() ||
    !categoria.value ||
    !descricao.value.trim() ||
    !bairro.value.trim() ||
    !telefone.value.trim()
  ) {
    erro.value = 'Preencha todos os campos obrigatórios.'
    return
  }

  salvando.value = true
  try {
    localStorage.setItem('perfilEmpreendedorRascunho', JSON.stringify({
      profissao: profissao.value.trim(), categoria: categoria.value,
      descricao: descricao.value.trim(), bairro: bairro.value.trim(),
      telefone: telefone.value.trim(), servicos: servicos.value.trim(),
      disponibilidade: disponibilidade.value
    }))
    informar('Rascunho salvo neste navegador. A publicação para outras pessoas depende da conexão com o back-end.')
    router.push('/')
  } catch {
    erro.value = 'Não foi possível salvar neste navegador. Verifique as permissões de armazenamento.'
  } finally {
    salvando.value = false
  }
}

function voltar() {
  router.push('/cadastro/empreendedor')
}
</script>

<template>
  <main class="min-h-screen bg-slate-100 flex justify-center">
    <section
      class="w-full max-w-105 min-h-screen bg-white flex flex-col px-5 py-8 pb-10"
    >
      <!-- CABEÇALHO -->
      <div class="pt-2 mb-6">

        <!-- VOLTAR -->
        <button
          type="button"
          @click="voltar"
          class="group flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#D94E1E] transition-all duration-200 mb-5"
        >
          <span
            class="text-lg transition-transform duration-200 group-hover:-translate-x-1"
          >
            ←
          </span>

          Voltar
        </button>

        <!-- TÍTULO -->
        <div class="text-center">
          <div
            class="mx-auto mb-4 w-16 h-16 rounded-full bg-orange-50 border-2 border-[#D94E1E] flex items-center justify-center text-3xl shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            👨‍🔧
          </div>

          <h1
            class="text-[25px] leading-tight font-extrabold text-slate-800"
          >
            Seu perfil profissional
          </h1>

          <p
            class="mt-2 text-[13px] leading-relaxed text-slate-500"
          >
            Agora vamos apresentar seu trabalho para os clientes.
          </p>
        </div>
      </div>

      <!-- PROGRESSO -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-bold text-[#D94E1E]">
            ETAPA 2 DE 2
          </span>

          <span class="text-[10px] text-slate-400">
            Perfil profissional
          </span>
        </div>

        <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            class="h-full w-full bg-[#D94E1E] rounded-full transition-all duration-500"
          ></div>
        </div>
      </div>

      <!-- CARD -->
      <div
        class="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 transition-all duration-300 hover:shadow-md"
      >
        <!-- INTRODUÇÃO -->
        <div class="mb-6">
          <div class="flex items-center gap-2 mb-1">
            <div
              class="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-base"
            >
              👤
            </div>

            <h2 class="text-lg font-bold text-slate-800">
              Informações profissionais
            </h2>
          </div>

          <p class="text-xs text-slate-400 mt-2 leading-relaxed">
            Essas informações serão utilizadas para montar seu perfil na
            plataforma.
          </p>
        </div>

        <!-- FORMULÁRIO -->
        <p class="mb-4 rounded-xl bg-orange-50 p-3 text-xs text-slate-600">Este formulário salva um rascunho local. O perfil ainda não será publicado.</p>
        <form
          @submit.prevent="salvarPerfil"
          class="space-y-5"
        >

          <!-- PROFISSÃO -->
          <div>
            <label
              for="profissao"
              class="block text-xs font-bold text-slate-700 mb-2"
            >
              Profissão
              <span class="text-[#D94E1E]">*</span>
            </label>

            <input
              id="profissao"
              v-model="profissao"
              type="text"
              placeholder="Ex.: Eletricista"
              class="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs px-3.5 py-3 rounded-xl border border-slate-200 outline-none transition-all duration-200 focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/20 focus:shadow-sm"
            />
          </div>

          <!-- CATEGORIA -->
          <div>
            <label
              for="categoria"
              class="block text-xs font-bold text-slate-700 mb-2"
            >
              Categoria
              <span class="text-[#D94E1E]">*</span>
            </label>

            <select
              id="categoria"
              v-model="categoria"
              class="w-full bg-slate-50 text-slate-800 text-xs px-3.5 py-3 rounded-xl border border-slate-200 outline-none transition-all duration-200 focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/20 focus:shadow-sm"
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>

              <option value="Construcao">
                🔨 Construção
              </option>

              <option value="Beleza">
                ✂️ Beleza
              </option>

              <option value="Servicos Gerais">
                🔧 Serviços Gerais
              </option>

              <option value="Tecnologia">
                💻 Tecnologia
              </option>
              <option value="Fotografia">📷 Fotografia</option>
              <option value="Eventos">🎉 Eventos</option>
            </select>
          </div>

          <!-- DESCRIÇÃO -->
          <div>
            <label
              for="descricao"
              class="block text-xs font-bold text-slate-700 mb-2"
            >
              Sobre seu trabalho
              <span class="text-[#D94E1E]">*</span>
            </label>

            <textarea
              id="descricao"
              v-model="descricao"
              rows="4"
              maxlength="300"
              placeholder="Conte um pouco sobre seu trabalho, experiência e o que você oferece."
              class="w-full resize-none bg-slate-50 text-slate-800 placeholder-slate-400 text-xs px-3.5 py-3 rounded-xl border border-slate-200 outline-none transition-all duration-200 focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/20 focus:shadow-sm"
            ></textarea>

            <div class="text-right mt-1">
              <span class="text-[10px] text-slate-400">
                {{ descricao.length }}/300
              </span>
            </div>
          </div>

          <!-- BAIRRO -->
          <div>
            <label
              for="bairro"
              class="block text-xs font-bold text-slate-700 mb-2"
            >
              Bairro / Região
              <span class="text-[#D94E1E]">*</span>
            </label>

            <div class="relative">
              <input
                id="bairro"
                v-model="bairro"
                type="text"
                placeholder="Ex.: Marco, Belém - PA"
                class="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs px-3.5 py-3 pl-10 rounded-xl border border-slate-200 outline-none transition-all duration-200 focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/20 focus:shadow-sm"
              />

              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
              >
                📍
              </span>
            </div>
          </div>

          <!-- TELEFONE -->
          <div>
            <label
              for="telefone"
              class="block text-xs font-bold text-slate-700 mb-2"
            >
              Telefone / WhatsApp
              <span class="text-[#D94E1E]">*</span>
            </label>

            <div class="relative">
              <input
                id="telefone"
                v-model="telefone"
                type="tel"
                placeholder="(91) 99999-9999"
                autocomplete="tel"
                class="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs px-3.5 py-3 pl-10 rounded-xl border border-slate-200 outline-none transition-all duration-200 focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/20 focus:shadow-sm"
              />

              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
              >
                📱
              </span>
            </div>
          </div>

          <!-- SERVIÇOS -->
          <div>
            <label
              for="servicos"
              class="block text-xs font-bold text-slate-700 mb-2"
            >
              Serviços oferecidos
            </label>

            <textarea
              id="servicos"
              v-model="servicos"
              rows="3"
              placeholder="Ex.: Instalação elétrica, manutenção, troca de tomadas..."
              class="w-full resize-none bg-slate-50 text-slate-800 placeholder-slate-400 text-xs px-3.5 py-3 rounded-xl border border-slate-200 outline-none transition-all duration-200 focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/20 focus:shadow-sm"
            ></textarea>
          </div>

          <!-- DISPONIBILIDADE -->
          <div>
            <label
              for="disponibilidade"
              class="block text-xs font-bold text-slate-700 mb-2"
            >
              Disponibilidade
            </label>

            <select
              id="disponibilidade"
              v-model="disponibilidade"
              class="w-full bg-slate-50 text-slate-800 text-xs px-3.5 py-3 rounded-xl border border-slate-200 outline-none transition-all duration-200 focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/20 focus:shadow-sm"
            >
              <option value="" disabled>
                Quando você costuma trabalhar?
              </option>

              <option value="manha">
                ☀️ Manhã
              </option>

              <option value="tarde">
                🌤️ Tarde
              </option>

              <option value="noite">
                🌙 Noite
              </option>

              <option value="flexivel">
                🕐 Horário flexível
              </option>
            </select>
          </div>

          <!-- ERRO -->
          <div
            v-if="erro"
            class="bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 animate-pulse"
          >
            <p class="text-xs font-medium text-red-600">
              {{ erro }}
            </p>
          </div>

          <!-- BOTÃO -->
          <button
            type="submit"
            :disabled="salvando"
            class="group relative w-full overflow-hidden bg-[#D94E1E] text-white px-4 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all duration-200 hover:bg-[#C34418] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span
              v-if="!salvando"
              class="relative z-10"
            >
              Criar meu perfil
            </span>

            <span
              v-else
              class="relative z-10 flex items-center justify-center gap-2"
            >
              <span
                class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
              ></span>

              Salvando perfil...
            </span>

            <!-- EFEITO DE BRILHO -->
            <span
              class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent"
            ></span>
          </button>
        </form>
      </div>

      <!-- RODAPÉ -->
      <div class="pt-6 text-center">
        <p class="text-[10px] text-slate-400">
          Seu trabalho merece ser encontrado.
        </p>
      </div>
    </section>
  </main>
</template>
