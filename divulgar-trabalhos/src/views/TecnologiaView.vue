<script setup>
import { informar, focarBusca, subirPagina, normalizarTexto } from '../utils/interface'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const busca = ref('')
const subcategoriaAtiva = ref('Todas')
const filtroAtivo = ref('')
const favoritos = ref([])
const mostrarFiltros = ref(false)
const servicoSelecionado = ref(null)

const subcategorias = [
  {
    nome: 'Todas',
    icone: 'verified'
  },
  {
    nome: 'Conserto de Celular',
    icone: 'smartphone'
  },
  {
    nome: 'Técnico de Informática',
    icone: 'laptop_mac'
  },
  {
    nome: 'Redes & Wi-Fi',
    icone: 'router'
  },
  {
    nome: 'Câmeras & CFTV',
    icone: 'videocam'
  },
  {
    nome: 'Smart TVs',
    icone: 'tv'
  },
  {
    nome: 'Impressoras',
    icone: 'print'
  }
]

const filtros = [
  {
    nome: 'Atendimento remoto',
    icone: 'laptop'
  },
  {
    nome: 'Atendimento em casa',
    icone: 'home'
  },
  {
    nome: 'Melhores notas',
    icone: 'star'
  }
]

const profissionais = ref([
  {
    nome: 'Dr. Smartphone Express',
    profissao: 'Conserto de Celulares e Tablets',
    categoria: 'Conserto de Celular',
    avaliacao: 4.9,
    avaliacoes: 198,
    bairro: 'Consolação',
    distancia: 1.1,
    disponibilidade: 'Orçamento grátis em 1h',
    atendimentoRemoto: false,
    atendimentoDomicilio: false,
    destaque: 'Lab próprio',
    observacao: 'Entrega no mesmo dia',
    observacaoIcone: 'schedule',
    botao: 'Pedir Orçamento',
    botaoIcone: 'request_quote',
    especialidades: [
      'Troca de Tela',
      'Bateria Original',
      'Conector de Carga'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUnFgBtu0MOHVFY7IxtLa0-V_7WvL6aF6zaMIYLEX9ZxCiPQIknSn1fKbJVek2AhPZuecYCpjAyY6LQ0juFR1dtC1nc_BP9kAvDuUHdUbac_8YEUbUycKkkdtinT14XDgFVRj-GcdujrwjqB_pqZGp7PktkEuBBjyYnu2ym0-Np1c8RQk0UuEnLj2h813ARHseVcx2sbqazgNEj47xYzv3rYoEbAKmZE7x-mpYhp3EBlBILaVyRpHx'
  },
  {
    nome: 'Lucas Tech Suporte TI',
    profissao: 'Técnico de Notebooks e PCs',
    categoria: 'Técnico de Informática',
    avaliacao: 4.8,
    avaliacoes: 115,
    bairro: 'Perdizes',
    distancia: 2.3,
    disponibilidade: 'Presencial ou remoto',
    atendimentoRemoto: true,
    atendimentoDomicilio: true,
    destaque: '',
    observacao: 'Avaliação prévia sem custo',
    observacaoIcone: 'check_circle',
    botao: 'Ver Perfil',
    botaoIcone: 'person',
    especialidades: [
      'Formatação & Backup',
      'Upgrade SSD & RAM',
      'Remoção de Vírus'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDi9bp-iHCSnxlfs1YaZdjwq7VMHivMRxUD3O6OBr49ypOfRVweI8bgsEc4DuSgoWzM0tLxH8-rHCAysRLflwnSYc7Ks_sQx8PSofflz6kqX4C7HOWvsXRQtUaG0VZXgeYeyz1QXimau5eKfDKNhYnbfOav76Ml4SSbjbWOw_sspaGNK63osMOhAPBJFAvesqYlmAEimoUwO1jUmat91IZpqLaHN5j_kxUYxX9rVkrsGfzl2vCHM4dV'
  },
  {
    nome: 'SeguraNet Redes & Câmeras',
    profissao: 'Instalador de CFTV e Wi-Fi Mesh',
    categoria: 'Redes & Wi-Fi',
    categoriaSecundaria: 'Câmeras & CFTV',
    avaliacao: 5,
    avaliacoes: 89,
    bairro: 'Pinheiros',
    distancia: 2.9,
    disponibilidade: 'Disponível hoje',
    atendimentoRemoto: false,
    atendimentoDomicilio: true,
    destaque: '',
    observacao: 'Visita técnica gratuita',
    observacaoIcone: 'check_circle',
    botao: 'Contatar',
    botaoIcone: 'chat',
    especialidades: [
      'Câmeras Intelbras',
      'Roteadores Mesh',
      'Cabeamento Estruturado'
    ],
    imagem:
      'https://shop.nexustrd.com/cdn/shop/files/installation_03_43_24PM.png?v=1763639069'
  },
  {
    nome: 'Áudio & Vídeo Smart',
    profissao: 'Instalação de Suportes e TVs',
    categoria: 'Smart TVs',
    avaliacao: 4.7,
    avaliacoes: 53,
    bairro: 'Moema',
    distancia: 3.4,
    disponibilidade: 'Especialista em TV',
    atendimentoRemoto: false,
    atendimentoDomicilio: true,
    destaque: '',
    observacao: 'Leva suportes e cabos',
    observacaoIcone: 'inventory_2',
    botao: 'Pedir Orçamento',
    botaoIcone: 'request_quote',
    especialidades: [
      'Instalação em Painel',
      'Configuração Alexa',
      'Home Theater'
    ],
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDAoZuFHnLZcJKXythIvPiRpikkDrLzzljf13TsyZWwYb9R7FOt49f3ZM3FCgzCi84v9aJIKQDQOPcQhSgZmOy0d-7kak1pd38ZuXV7_zKu0S4bt7-2qqBMTQNOm0xm3ZwsVqxQaXU2Ef92uhPpyvU7l8F77ucX012HVnSQbxwQXVizVcra7qzA_375zgF8vWftCUibfLBvkLvl6bYKF-f2WprElsGNw5yLmpgG5ksXZjUF_dOehOT5'
  }
])

const profissionaisExibidos = computed(() => {
  let resultado = [...profissionais.value]

  if (subcategoriaAtiva.value !== 'Todas') {
    resultado = resultado.filter((profissional) => {
      return (
        profissional.categoria === subcategoriaAtiva.value ||
        profissional.categoriaSecundaria === subcategoriaAtiva.value
      )
    })
  }

  if (filtroAtivo.value === 'Atendimento remoto') {
    resultado = resultado.filter(
      (profissional) => profissional.atendimentoRemoto
    )
  }

  if (filtroAtivo.value === 'Atendimento em casa') {
    resultado = resultado.filter(
      (profissional) => profissional.atendimentoDomicilio
    )
  }

  if (filtroAtivo.value === 'Melhores notas') {
    resultado = resultado.filter(
      (profissional) => profissional.avaliacao >= 4.9
    )
  }

  const termo = normalizarTexto(busca.value)

  if (termo) {
    resultado = resultado.filter((profissional) => {
      const conteudo = [
        profissional.nome,
        profissional.profissao,
        profissional.categoria,
        profissional.categoriaSecundaria,
        profissional.bairro,
        profissional.destaque,
        ...profissional.especialidades
      ]
        .filter(Boolean)
        .join(' ')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

      return conteudo.includes(termo)
    })
  }

  return resultado
})

function selecionarFiltro(nome) {
  filtroAtivo.value =
    filtroAtivo.value === nome ? '' : nome
}

function alternarFavorito(nome) {
  if (favoritos.value.includes(nome)) {
    favoritos.value = favoritos.value.filter(
      (favorito) => favorito !== nome
    )
  } else {
    favoritos.value.push(nome)
  }
}

function estaFavoritado(nome) {
  return favoritos.value.includes(nome)
}

function solicitarServico(profissional) {
  servicoSelecionado.value = profissional
}

function fecharServico() {
  servicoSelecionado.value = null
}

function voltar() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-800">

    <!-- CABEÇALHO -->
    <header
      class="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm"
    >
      <div
        class="max-w-[1100px] mx-auto h-16 px-4 flex items-center justify-between gap-3"
      >
        <div class="flex items-center gap-2">
          <button
            type="button"
            aria-label="Voltar"
            class="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-[#D94E1E] transition"
            @click="voltar"
          >
            <span class="material-symbols-outlined text-2xl">
              arrow_back
            </span>
          </button>

          <div>
            <h1 class="text-base sm:text-lg font-bold leading-tight">
              Tecnologia
            </h1>

            <p class="hidden sm:block text-xs text-slate-500">
              Profissionais perto de você
            </p>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <button @click="informar('Não há notificações nesta demonstração.')"
            type="button"
            aria-label="Notificações"
            class="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-[#D94E1E] transition"
          >
            <span class="material-symbols-outlined text-2xl">
              notifications
            </span>
          </button>

          <div
            class="w-9 h-9 rounded-full bg-[#D94E1E] flex items-center justify-center shadow-sm"
          >
            <span class="material-symbols-outlined text-white text-lg">
              person
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- CONTEÚDO -->
    <main class="w-full pt-20 pb-24 px-4">
      <div class="max-w-[850px] mx-auto flex flex-col gap-4">

        <!-- APRESENTAÇÃO -->
        <section
          class="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200"
        >
          <div class="flex items-start justify-between gap-3 mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-2xl bg-[#FFF1EB] flex items-center justify-center text-[#D94E1E]"
              >
                <span class="material-symbols-outlined text-2xl">
                  devices
                </span>
              </div>

              <div>
                <h2 class="text-lg sm:text-xl font-bold">
                  Tecnologia
                </h2>

                <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Encontre especialistas em tecnologia
                </p>
              </div>
            </div>

            <button @click="informar('Profissionais, avaliações e distâncias são exemplos demonstrativos. Não há geolocalização ativa.')"
              type="button"
              aria-label="Informações"
              class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#D94E1E] hover:bg-[#FFF1EB] transition"
            >
              <span class="material-symbols-outlined text-xl">
                info
              </span>
            </button>
          </div>

          <!-- BUSCA -->
          <div class="relative">
            <span
              class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
            >
              search
            </span>

            <input
              v-model="busca"
              type="text"
              class="w-full h-12 pl-11 pr-12 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:bg-white focus:border-[#D94E1E] focus:ring-2 focus:ring-[#D94E1E]/10 transition"
              placeholder="Buscar profissional, serviço ou bairro..."
            />

            <button
              type="button"
              aria-label="Abrir filtros"
              class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-[#FFF1EB] hover:text-[#D94E1E] transition"
              @click="mostrarFiltros = !mostrarFiltros"
            >
              <span class="material-symbols-outlined text-xl">
                tune
              </span>
            </button>
          </div>

          <!-- FILTROS EXPANDIDOS -->
          <div
            v-if="mostrarFiltros"
            class="mt-3 p-3 rounded-xl bg-[#FFF1EB] border border-orange-100"
          >
            <p class="text-xs font-semibold text-slate-600 mb-2">
              Filtros rápidos
            </p>

            <div class="flex flex-wrap gap-2">
              <button
                v-for="filtro in filtros"
                :key="filtro.nome"
                type="button"
                class="px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                :class="
                  filtroAtivo === filtro.nome
                    ? 'bg-[#D94E1E] text-white'
                    : 'bg-white text-slate-600 hover:text-[#D94E1E]'
                "
                @click="selecionarFiltro(filtro.nome)"
              >
                <span class="material-symbols-outlined text-base">
                  {{ filtro.icone }}
                </span>

                {{ filtro.nome }}
              </button>
            </div>
          </div>
        </section>

        <!-- SUBCATEGORIAS -->
        <section class="-mx-4 px-4 overflow-x-auto">
          <div class="flex gap-2 py-1">
            <button
              v-for="subcategoria in subcategorias"
              :key="subcategoria.nome"
              type="button"
              class="shrink-0 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all"
              :class="
                subcategoriaAtiva === subcategoria.nome
                  ? 'bg-[#D94E1E] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#D94E1E] hover:text-[#D94E1E]'
              "
              @click="subcategoriaAtiva = subcategoria.nome"
            >
              <span class="material-symbols-outlined text-base">
                {{ subcategoria.icone }}
              </span>

              {{ subcategoria.nome }}
            </button>
          </div>
        </section>

        <!-- LOCALIZAÇÃO E FILTROS -->
        <section class="flex flex-col gap-2">
          <div
            class="flex flex-wrap items-center justify-between gap-2"
          >
            <div class="flex items-center gap-1.5">
              <span
                class="material-symbols-outlined text-lg text-[#D94E1E]"
              >
                location_on
              </span>

              <strong class="text-sm">
                {{ profissionaisExibidos.length }} profissionais
              </strong>

              <span class="text-xs sm:text-sm text-slate-500">
                em Belém, PA
              </span>
            </div>

            <span
              class="flex items-center gap-1.5 text-xs font-semibold text-emerald-600"
            >
              <span
                class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
              ></span>

              Disponibilidade atual
            </span>
          </div>

          <!-- FILTROS -->
          <div class="flex gap-2 overflow-x-auto pb-1">
            <button
              v-for="filtro in filtros"
              :key="filtro.nome"
              type="button"
              class="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition"
              :class="
                filtroAtivo === filtro.nome
                  ? 'bg-[#D94E1E] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-[#D94E1E] hover:border-[#D94E1E]'
              "
              @click="selecionarFiltro(filtro.nome)"
            >
              <span class="material-symbols-outlined text-sm">
                {{ filtro.icone }}
              </span>

              {{ filtro.nome }}
            </button>
          </div>
        </section>

        <!-- DESTAQUE -->
        <section
          class="rounded-2xl p-4 sm:p-5 bg-linear-to-r from-[#D94E1E] to-[#E9683B] text-white shadow-md overflow-hidden relative"
        >
          <div class="relative z-10 flex items-center justify-between gap-4">
            <div class="max-w-[600px]">
              <span
                class="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-orange-100"
              >
                Soluções em tecnologia
              </span>

              <h3 class="text-lg sm:text-xl font-bold mt-1">
                Precisa de ajuda com tecnologia?
              </h3>

              <p class="text-xs sm:text-sm text-orange-50 mt-1">
                Encontre profissionais para celulares, computadores, redes,
                câmeras, TVs e outros serviços.
              </p>
            </div>

            <div
              class="hidden sm:flex w-16 h-16 rounded-2xl bg-white/15 items-center justify-center shrink-0"
            >
              <span class="material-symbols-outlined text-4xl">
                devices
              </span>
            </div>
          </div>

          <div
            class="absolute -right-8 -bottom-12 w-32 h-32 rounded-full bg-white/10"
          ></div>
        </section>

        <!-- LISTA DE PROFISSIONAIS -->
        <section class="flex flex-col gap-3">
          <article
            v-for="profissional in profissionaisExibidos"
            :key="profissional.nome"
            class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <!-- CABEÇALHO -->
            <div class="flex items-start gap-3">
              <div class="relative shrink-0">
                <img
                  :src="profissional.imagem"
                  :alt="profissional.nome"
                  class="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl object-cover bg-slate-100"
                />

                <span
                  class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white"
                ></span>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <h3 class="text-base sm:text-lg font-bold truncate">
                      {{ profissional.nome }}
                    </h3>

                    <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
                      {{ profissional.profissao }}
                    </p>
                  </div>

                  <button
                    type="button"
                    :aria-label="
                      estaFavoritado(profissional.nome)
                        ? 'Remover dos favoritos'
                        : 'Adicionar aos favoritos'
                    "
                    class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition"
                    :class="
                      estaFavoritado(profissional.nome)
                        ? 'text-[#D94E1E] bg-[#FFF1EB]'
                        : 'text-slate-400 hover:text-[#D94E1E] hover:bg-[#FFF1EB]'
                    "
                    @click="alternarFavorito(profissional.nome)"
                  >
                    <span
                      class="material-symbols-outlined text-xl"
                      :style="
                        estaFavoritado(profissional.nome)
                          ? { fontVariationSettings: `'FILL' 1` }
                          : {}
                      "
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <!-- DISPONIBILIDADE -->
                <div class="mt-1.5">
                  <span
                    class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold"
                    :class="
                      profissional.disponibilidade.includes('hoje') ||
                      profissional.disponibilidade.includes('1h') ||
                      profissional.disponibilidade.includes('remoto')
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    "
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full"
                      :class="
                        profissional.disponibilidade.includes('hoje') ||
                        profissional.disponibilidade.includes('1h') ||
                        profissional.disponibilidade.includes('remoto')
                          ? 'bg-emerald-500 animate-pulse'
                          : 'bg-slate-400'
                      "
                    ></span>

                    {{ profissional.disponibilidade }}
                  </span>
                </div>

                <!-- AVALIAÇÃO / LOCAL -->
                <div
                  class="flex flex-wrap items-center gap-2 mt-2 text-xs"
                >
                  <span
                    class="flex items-center gap-0.5 font-bold text-amber-600"
                  >
                    <span
                      class="material-symbols-outlined text-[15px]"
                      style="font-variation-settings: 'FILL' 1"
                    >
                      star
                    </span>

                    {{ profissional.avaliacao }}
                  </span>

                  <span class="text-slate-400">
                    ({{ profissional.avaliacoes }} avaliações)
                  </span>

                  <span class="text-slate-300">
                    •
                  </span>

                  <span class="flex items-center gap-0.5 text-slate-500">
                    <span class="material-symbols-outlined text-[14px]">
                      location_on
                    </span>

                    {{ profissional.bairro }}
                    •
                    {{ profissional.distancia }} km
                  </span>
                </div>
              </div>
            </div>

            <!-- ESPECIALIDADES -->
            <div class="flex flex-wrap gap-1.5 mt-3">
              <span
                v-for="especialidade in profissional.especialidades"
                :key="especialidade"
                class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] sm:text-[11px]"
              >
                {{ especialidade }}
              </span>
            </div>

            <!-- AÇÕES -->
            <div class="flex gap-2 mt-4">
              <button
                type="button"
                class="flex-1 min-h-11 rounded-xl px-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition active:scale-[0.98] bg-[#FFF1EB] hover:bg-[#FFE5DC] text-[#D94E1E]"
                @click="solicitarServico(profissional)"
              >
                <span class="material-symbols-outlined text-lg">
                  {{ profissional.botaoIcone }}
                </span>

                {{ profissional.botao }}
              </button>

              <button @click="informar('As mensagens ainda não estão disponíveis nesta demonstração.')"
                type="button"
                aria-label="Abrir conversa"
                class="w-11 h-11 shrink-0 rounded-xl bg-slate-100 text-slate-500 hover:bg-[#FFF1EB] hover:text-[#D94E1E] flex items-center justify-center transition"
              >
                <span class="material-symbols-outlined text-xl">
                  chat
                </span>
              </button>
            </div>
          </article>

          <!-- NENHUM RESULTADO -->
          <div
            v-if="profissionaisExibidos.length === 0"
            class="bg-white rounded-2xl p-10 text-center shadow-sm border border-slate-200"
          >
            <div
              class="w-14 h-14 mx-auto rounded-full bg-[#FFF1EB] text-[#D94E1E] flex items-center justify-center"
            >
              <span class="material-symbols-outlined text-3xl">
                search_off
              </span>
            </div>

            <h3 class="font-bold mt-3">
              Nenhum profissional encontrado
            </h3>

            <p class="text-sm text-slate-500 mt-1">
              Tente mudar a categoria, o filtro ou o termo da busca.
            </p>
          </div>
        </section>

        <!-- INFORMAÇÃO -->
        <section
          class="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200"
        >
          <div
            class="w-10 h-10 rounded-xl bg-[#FFF1EB] text-[#D94E1E] flex items-center justify-center shrink-0"
          >
            <span class="material-symbols-outlined">
              verified_user
            </span>
          </div>

          <div>
            <h3 class="text-sm font-bold">
              Encontre especialistas em tecnologia
            </h3>

            <p class="text-xs text-slate-500 mt-1 leading-relaxed">
              Compare categorias, avaliações, distância e disponibilidade
              para encontrar o profissional que melhor atende sua necessidade.
            </p>
          </div>
        </section>
      </div>
    </main>

    <!-- MENU INFERIOR -->
    <nav
      class="fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.05)]"
    >
      <div
        class="max-w-[700px] mx-auto flex justify-around items-center h-16 px-1"
      >
        <button
          type="button"
          class="flex flex-col items-center justify-center min-w-14 min-h-11 text-slate-500 hover:text-[#D94E1E] transition"
          @click="voltar"
        >
          <span class="material-symbols-outlined text-2xl">
            home
          </span>

          <span class="text-[10px]">
            Início
          </span>
        </button>

        <button @click="router.push({ path: '/', hash: '#categorias' })"
          type="button"
          class="flex flex-col items-center justify-center min-w-14 min-h-11 text-[#D94E1E] font-bold"
        >
          <span class="material-symbols-outlined text-2xl">
            grid_view
          </span>

          <span class="text-[10px]">
            Categorias
          </span>
        </button>

        <button
          type="button"
          class="flex flex-col items-center justify-center min-w-14 min-h-11 text-slate-500 hover:text-[#D94E1E] transition"
          @click="focarBusca"
        >
          <span class="material-symbols-outlined text-2xl">
            search
          </span>

          <span class="text-[10px]">
            Buscar
          </span>
        </button>

        <button @click="informar('As mensagens ainda não estão disponíveis nesta demonstração.')"
          type="button"
          class="flex flex-col items-center justify-center min-w-14 min-h-11 text-slate-500 hover:text-[#D94E1E] transition"
        >
          <span class="material-symbols-outlined text-2xl">
            chat
          </span>

          <span class="text-[10px]">
            Mensagens
          </span>
        </button>

        <button @click="router.push('/login')"
          type="button"
          class="flex flex-col items-center justify-center min-w-14 min-h-11 text-slate-500 hover:text-[#D94E1E] transition"
        >
          <span class="material-symbols-outlined text-2xl">
            person
          </span>

          <span class="text-[10px]">
            Perfil
          </span>
        </button>
      </div>
    </nav>

    <!-- MODAL DEMONSTRATIVO -->
    <div
      v-if="servicoSelecionado"
      class="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      @click.self="fecharServico"
    >
      <div
        class="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5"
      >
        <div class="flex items-center justify-between gap-3">
          <div>
            <span
              class="text-xs font-bold uppercase tracking-wide text-[#D94E1E]"
            >
              Protótipo
            </span>

            <h2 class="text-lg font-bold mt-1">
              {{ servicoSelecionado.botao }}
            </h2>
          </div>

          <button
            type="button"
            aria-label="Fechar"
            class="w-9 h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-[#FFF1EB] hover:text-[#D94E1E]"
            @click="fecharServico"
          >
            <span class="material-symbols-outlined">
              close
            </span>
          </button>
        </div>

        <div
          class="mt-4 p-3 rounded-xl bg-[#FFF1EB] flex items-center gap-3"
        >
          <img
            :src="servicoSelecionado.imagem"
            :alt="servicoSelecionado.nome"
            class="w-14 h-14 rounded-xl object-cover"
          />

          <div>
            <p class="font-bold text-sm">
              {{ servicoSelecionado.nome }}
            </p>

            <p class="text-xs text-slate-500 mt-0.5">
              {{ servicoSelecionado.profissao }}
            </p>
          </div>
        </div>

        <p class="text-sm text-slate-600 leading-relaxed mt-4">
          Esta interação é apenas demonstrativa. O projeto atualmente
          apresenta uma experiência visual de solicitação de serviço,
          sem realizar um agendamento ou contratação real.
        </p>

        <button
          type="button"
          class="w-full h-11 mt-5 rounded-xl bg-[#D94E1E] hover:bg-[#C34418] text-white font-bold transition"
          @click="fecharServico"
        >
          Entendi
        </button>
      </div>
    </div>
  </div>
</template>
