<script setup>
import { informar } from '../utils/interface'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const busca = ref('')
const mostrarMenuMobile = ref(false)
const mostrarConta = ref(false)
const mostrarConfiguracoes = ref(false)
const mostrarTodasCategorias = ref(false)
const mostrarTodosProfissionais = ref(false)
const buscaInput = ref(null)
const buscaPrincipalInput = ref(null)
const termoPesquisado = ref('')
const profissionalSelecionado = ref(null)
const mostrarResultadosBusca = ref(false)

/* VERIFICA SE O USUÁRIO ESTÁ LOGADO */
const usuarioLogado = ref(false)

function atualizarUsuarioLogado() {
  try {
    usuarioLogado.value = window.localStorage.getItem('usuarioLogado') === 'true'
  } catch {
    usuarioLogado.value = false
  }
}

function aoPressionarTecla(evento) {
  if (evento.key === 'Escape') {
    fecharMenus()
    fecharPerfil()
  }
}

onMounted(() => {
  atualizarUsuarioLogado()
  document.addEventListener('click', fecharMenus)
  document.addEventListener('keydown', aoPressionarTecla)
  window.addEventListener('storage', atualizarUsuarioLogado)
  window.addEventListener('focus', atualizarUsuarioLogado)
})

onUnmounted(() => {
  document.removeEventListener('click', fecharMenus)
  document.removeEventListener('keydown', aoPressionarTecla)
  window.removeEventListener('storage', atualizarUsuarioLogado)
  window.removeEventListener('focus', atualizarUsuarioLogado)
})

const categorias = [
  {
    nome: 'Construção',
    icone: '🔨',
    fundo: 'bg-yellow-50',
    destaque: 'hover:border-yellow-300'
  },
  {
    nome: 'Beleza',
    icone: '✂️',
    fundo: 'bg-pink-50',
    destaque: 'hover:border-pink-300'
  },
  {
    nome: 'Serv. Gerais',
    icone: '🔧',
    fundo: 'bg-sky-50',
    destaque: 'hover:border-sky-300'
  },
  {
    nome: 'Tecnologia',
    icone: '💻',
    fundo: 'bg-purple-50',
    destaque: 'hover:border-purple-300'
  },
  {
    nome: 'Fotografia',
    icone: '📷',
    fundo: 'bg-orange-50',
    destaque: 'hover:border-orange-300'
  },
  {
    nome: 'Eventos',
    icone: '🎉',
    fundo: 'bg-rose-50',
    destaque: 'hover:border-rose-300'
  }
]

const profissionais = [
  {
    nome: 'Carlos Eduardo Silveira',
    profissao: 'Eletricista & Manutenção',
    avaliacao: '4.9',
    avaliacoes: 84,
    bairro: 'Pinheiros, SP',
    categoria: 'Construção',
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDY80d73K5Q80t5eha8-jPIaDF-SkOmXG74fImcNA5C1WWxe64A604TDm-rl4-OgTFwJBxy5r0U-yFtTx4gOdUFnYSt0tnVoPpWMZ57vM5bPrlW8Yo4mgtfqr1DdSmaztppHWXjuL3L19GBdMTSg0PXobKW17fJMvlRq5ev34ryJfH_reYwbWO8vvHwAXDjteL7-nFQXgur70JSFACKcuBgOOoOryBrROKcezd7rgygSdfmJ38KQgnr'
  },
  {
    nome: 'Marcos Vinícius',
    profissao: 'Pintor & Reformas',
    avaliacao: '5.0',
    avaliacoes: 112,
    bairro: 'Vila Mariana, SP',
    categoria: 'Construção',
    imagem:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDY80d73K5Q80t5eha8-jPIaDF-SkOmXG74fImcNA5C1WWxe64A604TDm-rl4-OgTFwJBxy5r0U-yFtTx4gOdUFnYSt0tnVoPpWMZ57vM5bPrlW8Yo4mgtfqr1DdSmaztppHWXjuL3L19GBdMTSg0PXobKW17fJMvlRq5ev34ryJfH_reYwbWO8vvHwAXDjteL7-nFQXgur70JSFACKcuBgOOoOryBrROKcezd7rgygSdfmJ38KQgnr'  
  }
]

const profissionaisFiltrados = computed(() => {
  const termo = normalizarTexto(termoPesquisado.value)

  if (!termo) {
    return profissionais
  }

  return profissionais.filter((profissional) => {
    return (
      normalizarTexto(profissional.nome).includes(termo) ||
      normalizarTexto(profissional.profissao).includes(termo) ||
      normalizarTexto(profissional.bairro).includes(termo) ||
      normalizarTexto(profissional.categoria).includes(termo)
    )
  })
})

function normalizarTexto(texto) {
  return texto.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function buscar() {
  const termo = busca.value.trim()

  if (!termo) {
    limparBusca()
    return
  }

  termoPesquisado.value = termo
  fecharMenus()
  mostrarResultadosBusca.value = true
  mostrarTodosProfissionais.value = true

  nextTick(() => {
    const elemento = document.getElementById('resultados-profissionais')

    if (elemento) {
      elemento.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
}

async function focarBusca() {
  mostrarMenuMobile.value = false
  mostrarConta.value = false
  mostrarConfiguracoes.value = false

  await nextTick()

  const campo = buscaInput.value?.getClientRects().length
    ? buscaInput.value
    : buscaPrincipalInput.value

  if (campo) {
    campo.scrollIntoView({ behavior: 'smooth', block: 'center' })
    campo.focus({ preventScroll: true })
  }
}

function limparBusca() {
  busca.value = ''
  termoPesquisado.value = ''
  mostrarResultadosBusca.value = false
  mostrarTodosProfissionais.value = false

  nextTick(() => {
    focarBusca()
  })
}

function abrirCategoria(nome) {
  const rotas = {
    Construção: '/construcao',
    Beleza: '/beleza',
    'Serv. Gerais': '/servicos-gerais',
    Tecnologia: '/tecnologia',
    Fotografia: '/fotografia',
    Eventos: '/eventos'
  }

  const rota = rotas[nome]

  if (rota) {
    fecharMenus()
    router.push(rota)
  }
}

function alternarConta() {
  atualizarUsuarioLogado()
  mostrarConta.value = !mostrarConta.value
  mostrarConfiguracoes.value = false
  mostrarMenuMobile.value = false
}

function alternarConfiguracoes() {
  atualizarUsuarioLogado()
  mostrarConfiguracoes.value = !mostrarConfiguracoes.value
  mostrarConta.value = false
  mostrarMenuMobile.value = false
}

function fecharMenus() {
  mostrarConta.value = false
  mostrarConfiguracoes.value = false
  mostrarMenuMobile.value = false
}

/* SAIR DA CONTA */
function sairDaConta() {
  try {
    window.localStorage.removeItem('usuarioLogado')
  } catch {
    // O armazenamento pode estar indisponível no navegador.
  }
  usuarioLogado.value = false
  fecharMenus()
}

function irParaInicio() {
  fecharMenus()
  router.push('/')
}

function irParaCadastroEmpreendedor() {
  fecharMenus()
  router.push('/cadastro/empreendedor')
}

function irParaCadastro() {
  fecharMenus()
  router.push('/cadastro')
}

function irParaLogin() {
  fecharMenus()
  router.push('/login')
}

function alternarCategorias() {
  mostrarTodasCategorias.value = !mostrarTodasCategorias.value
}

function alternarProfissionais() {
  mostrarTodosProfissionais.value = !mostrarTodosProfissionais.value
}

function abrirPerfil(profissional) {
  profissionalSelecionado.value = profissional
  fecharMenus()
}

function fecharPerfil() {
  profissionalSelecionado.value = null
}
</script>

<template>
  <div
    class="min-h-screen bg-slate-100 text-slate-800"
    @click.self="fecharMenus"
  >
    <!-- CABEÇALHO -->
    <header
      class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4"
      >
        <!-- LOGO -->
        <button
          type="button"
          @click="irParaInicio"
          class="group flex items-center gap-3 shrink-0"
        >
          <div
            class="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-xl transition-all duration-300 group-hover:bg-[#D94E1E] group-hover:scale-105 group-hover:shadow-md"
          >
            🏙️
          </div>

          <div class="hidden sm:block text-left">
            <h1
              class="text-sm font-extrabold text-slate-800 leading-tight group-hover:text-[#D94E1E] transition-colors"
            >
              Divulgar Trabalhos
            </h1>

            <p class="text-[10px] text-slate-400 mt-0.5">
              Serviços da sua região
            </p>
          </div>
        </button>

        <!-- BUSCA DESKTOP -->
        <div class="hidden md:flex flex-1 max-w-xl">
          <div
            class="w-full flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-3 transition-all duration-200 focus-within:bg-white focus-within:border-[#D94E1E] focus-within:ring-4 focus-within:ring-[#D94E1E]/10"
          >
            <span class="text-slate-400 text-sm mr-2">
              🔍
            </span>

            <input
              ref="buscaInput"
              v-model="busca"
              type="text"
              placeholder="O que você está procurando?"
              class="flex-1 bg-transparent outline-none border-0 text-xs text-slate-800 placeholder-slate-400 py-3"
              @keyup.enter="buscar"
            />

            <button
              v-if="busca"
              type="button"
              @click="limparBusca"
              class="text-slate-400 hover:text-[#D94E1E] mr-2 transition-colors"
              aria-label="Limpar busca"
            >
              ✕
            </button>

            <button
              type="button"
              @click="buscar"
              class="bg-[#D94E1E] text-white text-[11px] font-bold px-4 py-2 rounded-xl transition-all duration-200 hover:bg-[#C34418] hover:-translate-y-0.5 active:scale-95 shadow-sm"
            >
              Buscar
            </button>
          </div>
        </div>

        <!-- MENU DESKTOP -->
        <nav class="hidden lg:flex items-center gap-1">
          <button
            type="button"
            @click="irParaInicio"
            class="px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#D94E1E] bg-orange-50 transition-all hover:bg-orange-100"
          >
            Início
          </button>

          <button
            type="button"

            @click="focarBusca"

            class="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-[#D94E1E]"
          >
            Buscar serviços
          </button>

          <button
            type="button"
            @click="irParaCadastroEmpreendedor"
            class="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-[#D94E1E]"
          >
            Divulgar serviço
          </button>

          <!-- CONTA -->
          <div class="relative">
            <button
              type="button"
              @click.stop="alternarConta"
              class="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-[#D94E1E]"
            >
              <span>👤</span>
              Minha conta

              <span class="text-[10px]">
                {{ mostrarConta ? '▲' : '▼' }}
              </span>
            </button>

            <div
              v-if="mostrarConta"
              class="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl p-2"
              @click.stop
            >

              <button v-if="usuarioLogado" type="button" @click="fecharMenus(); router.push('/cadastro/empreendedor/perfil')" class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50">📝 Rascunho profissional</button>
              <!-- ENTRAR -->
              <button
                v-if="!usuarioLogado"

                type="button"
                @click="irParaLogin"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:text-[#D94E1E] transition-colors"
              >
                👤 Entrar na conta
              </button>

              <button
                type="button"
                @click="irParaCadastro"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:text-[#D94E1E] transition-colors"
              >
                📝 Criar conta
              </button>

              <button
                type="button"
                @click="irParaCadastroEmpreendedor"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:text-[#D94E1E] transition-colors"
              >
                📋 Divulgar meu serviço
              </button>

              <div class="h-px bg-slate-100 my-1"></div>

              <button
                type="button"
                @click="fecharMenus"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                ✕ Fechar menu
              </button>
            </div>
          </div>

          <!-- CONFIGURAÇÕES -->
          <div class="relative">
            <button
              type="button"
              @click.stop="alternarConfiguracoes"
              class="p-2.5 rounded-xl text-slate-500 transition-all hover:bg-orange-50 hover:text-[#D94E1E] hover:rotate-45"
              aria-label="Configurações"
            >
              ⚙️
            </button>

            <div
              v-if="mostrarConfiguracoes"
              class="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl p-2"
              @click.stop
            >
              <div class="px-3 py-2">
                <p class="text-[10px] font-bold uppercase text-slate-400">
                  Configurações
                </p>
              </div>

              <button
                type="button"
                @click="fecharMenus(); informar('Não há notificações nesta demonstração.')"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:text-[#D94E1E] transition-colors"
              >
                🔔 Notificações
              </button>

              <button
                type="button"
                @click="fecharMenus(); informar('Esta versão utiliza o tema claro.')"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:text-[#D94E1E] transition-colors"
              >
                🌙 Aparência
              </button>

              <button
                type="button"
                @click="fecharMenus(); informar('Este protótipo usa armazenamento local no navegador para o estado de demonstração e o rascunho do perfil.')"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:text-[#D94E1E] transition-colors"
              >
                🔒 Privacidade
              </button>

              <!-- SAIR NA ENGRENAGEM -->
              <div
                v-if="usuarioLogado"
                class="h-px bg-slate-100 my-1"
              ></div>

              <button
                v-if="usuarioLogado"
                type="button"
                @click="sairDaConta"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                🚪 Sair da conta
              </button>

            </div>
          </div>
        </nav>

        <!-- AÇÕES MOBILE -->
        <div class="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            @click="focarBusca"
            class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-orange-50 hover:text-[#D94E1E] transition-all active:scale-90"
            aria-label="Pesquisar"
          >
            🔍
          </button>

          <button
            type="button"
            @click.stop="mostrarMenuMobile = !mostrarMenuMobile; mostrarConta = false; mostrarConfiguracoes = false"
            class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-orange-50 hover:text-[#D94E1E] transition-all active:scale-90"
            aria-label="Abrir menu"
          >
            {{ mostrarMenuMobile ? '✕' : '☰' }}
          </button>
        </div>
      </div>

      <!-- MENU MOBILE -->
      <div
        v-if="mostrarMenuMobile"
        class="lg:hidden border-t border-slate-100 bg-white px-4 py-4 shadow-lg"
      >
        <div class="max-w-7xl mx-auto space-y-2">
          <button
            type="button"
            @click="irParaInicio"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-50 text-[#D94E1E] text-xs font-bold"
          >
            🏠
            Início
          </button>

          <button
            type="button"

            @click="focarBusca"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            🔍
            Buscar serviços
          </button>

          <button
            type="button"
            @click="irParaCadastroEmpreendedor"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            🔧
            Divulgar meu serviço
          </button>

          <button
            type="button"
            @click.stop="alternarConta"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            👤
            Minha conta
          </button>

          <button
            type="button"
            @click.stop="alternarConfiguracoes"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            ⚙️
            Configurações
          </button>
        </div>
      </div>
    </header>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="pb-24 lg:pb-10">
      <!-- HERO -->
      <section
        class="relative overflow-hidden bg-[#D94E1E] text-white"
      >
        <div
          class="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-white/10"
        ></div>

        <div
          class="absolute right-20 bottom-[-120px] w-80 h-80 rounded-full bg-orange-300/10"
        ></div>

        <div
          class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16"
        >
          <div class="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div class="max-w-2xl">
              <div
                class="inline-flex items-center gap-2 bg-white/15 border border-white/10 px-3 py-1.5 rounded-full text-[11px] font-semibold mb-5 backdrop-blur-sm"
              >
                <span
                  class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"
                ></span>

                Belém, PA
              </div>

              <h2
                class="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.08] tracking-tight mb-5"
              >
                Encontre profissionais.
                <span class="text-orange-200">
                  Valorize trabalhos locais.
                </span>
              </h2>

              <p
                class="text-sm sm:text-base leading-relaxed text-white/85 max-w-xl mb-7"
              >
                Conectamos você a profissionais da sua região para encontrar
                serviços de forma simples, rápida e segura.
              </p>

              <div
                class="flex flex-col sm:flex-row gap-2.5 max-w-2xl"
              >
                <div
                  class="flex-1 flex items-center bg-white rounded-2xl px-4 shadow-lg transition-all duration-200 focus-within:ring-4 focus-within:ring-white/20"
                >
                  <span class="text-slate-400 mr-2">
                    🔍
                  </span>

                  <input
                    ref="buscaPrincipalInput"
                    v-model="busca"
                    type="text"
                    placeholder="O que você precisa?"
                    class="flex-1 min-w-0 py-3.5 bg-transparent outline-none border-0 text-xs sm:text-sm text-slate-800 placeholder-slate-400"
                    @keyup.enter="buscar"
                  />
                </div>

                <button
                  type="button"
                  @click="buscar"
                  class="bg-[#F6A000] text-slate-900 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-all duration-200 hover:bg-amber-400 hover:-translate-y-1 hover:shadow-xl active:scale-[0.97]"
                >
                  Encontrar serviço
                </button>
              </div>

              <div
                class="flex flex-wrap gap-x-5 gap-y-2 mt-5 text-[11px] text-white/75"
              >
                <span class="flex items-center gap-1.5">
                  ✓ Profissionais locais
                </span>

                <span class="flex items-center gap-1.5">
                  ✓ Avaliações reais
                </span>

                <span class="flex items-center gap-1.5">
                  ✓ Busca por categoria
                </span>
              </div>
            </div>

            <div class="hidden lg:flex justify-end">
              <div
                class="w-full max-w-sm bg-white/10 border border-white/15 rounded-3xl p-6 backdrop-blur-md shadow-2xl"
              >
                <div class="flex items-center justify-between mb-6">
                  <div>
                    <p class="text-[10px] uppercase font-bold text-white/60">
                      Na sua região
                    </p>

                    <p class="text-xl font-extrabold mt-1">
                      Serviços perto de você
                    </p>
                  </div>

                  <div
                    class="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-2xl"
                  >
                    📍
                  </div>
                </div>

                <div class="space-y-3">
                  <button
                    type="button"
                    @click="abrirCategoria('Construção')"
                    class="w-full text-left bg-white/10 rounded-2xl p-4 flex items-center gap-3 hover:bg-white/20 transition-all"
                  >
                    <div
                      class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"
                    >
                      🔨
                    </div>

                    <div class="flex-1">
                      <p class="text-xs font-bold">
                        Construção
                      </p>

                      <p class="text-[10px] text-white/60">
                        Profissionais disponíveis
                      </p>
                    </div>

                    <span class="text-xs font-bold text-orange-200">
                      428+
                    </span>
                  </button>

                  <button
                    type="button"
                    @click="abrirCategoria('Tecnologia')"
                    class="w-full text-left bg-white/10 rounded-2xl p-4 flex items-center gap-3 hover:bg-white/20 transition-all"
                  >
                    <div
                      class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"
                    >
                      💻
                    </div>

                    <div class="flex-1">
                      <p class="text-xs font-bold">
                        Tecnologia
                      </p>

                      <p class="text-[10px] text-white/60">
                        Profissionais disponíveis
                      </p>
                    </div>

                    <span class="text-xs font-bold text-orange-200">
                      215+
                    </span>
                  </button>

                  <button
                    type="button"
                    @click="abrirCategoria('Beleza')"
                    class="w-full text-left bg-white/10 rounded-2xl p-4 flex items-center gap-3 hover:bg-white/20 transition-all"
                  >
                    <div
                      class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"
                    >
                      ✂️
                    </div>

                    <div class="flex-1">
                      <p class="text-xs font-bold">
                        Beleza
                      </p>

                      <p class="text-[10px] text-white/60">
                        Profissionais disponíveis
                      </p>
                    </div>

                    <span class="text-xs font-bold text-orange-200">
                      320+
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ESTATÍSTICAS -->
      <section class="bg-white border-b border-slate-200">
        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        >
          <div
            class="grid grid-cols-3 divide-x divide-slate-200"
          >
            <div class="text-center px-2">
              <span
                class="block text-2xl sm:text-3xl font-extrabold text-[#D94E1E]"
              >
                2.400+
              </span>

              <span
                class="block mt-1 text-[9px] sm:text-[10px] font-bold tracking-wide text-slate-400"
              >
                PROFISSIONAIS
              </span>
            </div>

            <div class="text-center px-2">
              <span
                class="block text-2xl sm:text-3xl font-extrabold text-[#D94E1E]"
              >
                18k+
              </span>

              <span
                class="block mt-1 text-[9px] sm:text-[10px] font-bold tracking-wide text-slate-400"
              >
                AVALIAÇÕES
              </span>
            </div>

            <div class="text-center px-2">
              <span
                class="block text-2xl sm:text-3xl font-extrabold text-[#D94E1E]"
              >
                47
              </span>

              <span
                class="block mt-1 text-[9px] sm:text-[10px] font-bold tracking-wide text-slate-400"
              >
                BAIRROS
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- CATEGORIAS -->
      <section id="categorias"
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-9"
      >
        <div class="flex items-end justify-between mb-5">
          <div>
            <span
              class="text-[10px] font-bold uppercase tracking-wider text-[#D94E1E]"
            >
              Explore
            </span>

            <h2
              class="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1"
            >
              Categorias
            </h2>

            <p class="text-xs text-slate-400 mt-1">
              Encontre profissionais pelo tipo de serviço.
            </p>
          </div>

          <button
            type="button"
            @click="alternarCategorias"
            class="text-xs font-bold text-[#D94E1E] hover:text-[#B83F17] transition-colors"
          >
            {{ mostrarTodasCategorias ? 'Mostrar menos' : 'Ver todas' }}
          </button>
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          <button
            v-for="(categoria, index) in categorias"
            v-show="mostrarTodasCategorias || index < 4"
            :key="categoria.nome"
            type="button"
            :class="categoria.destaque"
            class="group bg-white border border-slate-200 rounded-2xl p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl active:scale-[0.97] text-left"
            @click="abrirCategoria(categoria.nome)"
          >
            <div
              :class="categoria.fundo"
              class="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            >
              {{ categoria.icone }}
            </div>

            <h3
              class="text-xs font-extrabold text-slate-800 group-hover:text-[#D94E1E] transition-colors"
            >
              {{ categoria.nome }}
            </h3>

            <div class="flex items-center gap-1 mt-2">
              <span class="text-[10px] text-slate-400">
                Explorar
              </span>

              <span
                class="text-xs text-slate-300 group-hover:text-[#D94E1E] group-hover:translate-x-1 transition-all"
              >
                →
              </span>
            </div>
          </button>
        </div>
      </section>

      <!-- PROFISSIONAIS -->
      <section
        id="resultados-profissionais"
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 scroll-mt-24"
      >
        <div class="flex items-end justify-between mb-5">
          <div>
            <span
              class="text-[10px] font-bold uppercase tracking-wider text-[#D94E1E]"
            >
              Recomendados
            </span>

            <h2
              class="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1"
            >
              {{
                mostrarResultadosBusca
                  ? 'Resultados da busca'
                  : 'Profissionais em destaque'
              }}
            </h2>

            <p class="text-xs text-slate-400 mt-1">
              {{
                mostrarResultadosBusca
                  ? `Resultados para "${termoPesquisado}".`
                  : 'Veja alguns profissionais disponíveis na plataforma.'
              }}
            </p>
          </div>

          <button
            v-if="!mostrarResultadosBusca"
            type="button"
            @click="alternarProfissionais"
            class="text-xs font-bold text-[#D94E1E] hover:text-[#B83F17] transition-colors"
          >
            {{ mostrarTodosProfissionais ? 'Mostrar menos' : 'Ver todos' }}
          </button>

          <button
            v-else
            type="button"
            @click="limparBusca"
            class="text-xs font-bold text-[#D94E1E] hover:text-[#B83F17] transition-colors"
          >
            Limpar busca
          </button>
        </div>

        <!-- AVISO DE BUSCA -->
        <div
          v-if="mostrarResultadosBusca"
          class="mb-5 bg-orange-50 border border-orange-100 rounded-2xl px-4 py-3 flex items-center justify-between gap-3"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-9 h-9 rounded-xl bg-white flex items-center justify-center"
            >
              🔎
            </div>

            <div>
              <p class="text-xs font-extrabold text-slate-800">
                Busca realizada
              </p>

              <p class="text-[10px] text-slate-500 mt-0.5">
                Encontramos {{ profissionaisFiltrados.length }} resultado(s)
                na demonstração.
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="limparBusca"
            class="text-[10px] font-bold text-[#D94E1E] hover:underline"
          >
            Limpar
          </button>
        </div>

        <!-- CARDS -->
        <div
          v-if="profissionaisFiltrados.length"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <article
            v-for="(profissional, index) in profissionaisFiltrados"

            v-show="
              mostrarResultadosBusca ||
              mostrarTodosProfissionais ||
              index < 2
            "
            :key="profissional.nome"
            @click="abrirPerfil(profissional)"
            class="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
          >
            <div class="relative h-52 bg-slate-200 overflow-hidden">
              <img
                :src="profissional.imagem"
                :alt="profissional.nome"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-slate-900/50 via-transparent to-transparent"
              ></div>

              <div
                class="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-green-600 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm"
              >
                ● Disponível
              </div>

              <div
                class="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2"
              >
                <div
                  class="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl"
                >
                  <span class="text-amber-500 font-bold text-xs">
                    ★
                  </span>

                  <span class="text-xs font-extrabold text-slate-800 ml-1">
                    {{ profissional.avaliacao }}
                  </span>

                  <span class="text-[10px] text-slate-400 ml-1">
                    ({{ profissional.avaliacoes }})
                  </span>
                </div>

                <div
                  class="bg-slate-900/70 text-white px-3 py-1.5 rounded-xl backdrop-blur-sm"
                >
                  <span class="text-[10px]">
                    📍 {{ profissional.bairro }}
                  </span>
                </div>
              </div>
            </div>

            <div class="p-5">
              <h3
                class="text-base font-extrabold text-slate-800 group-hover:text-[#D94E1E] transition-colors"
              >
                {{ profissional.nome }}
              </h3>

              <p class="text-xs text-slate-500 mt-1">
                {{ profissional.profissao }}
              </p>

              <div class="flex items-center gap-2 mt-4">
                <span
                  class="w-2 h-2 rounded-full bg-green-500"
                ></span>

                <span class="text-[10px] font-semibold text-slate-400">
                  Disponível para novos trabalhos
                </span>
              </div>

              <button
                type="button"
                @click.stop="abrirPerfil(profissional)"
                class="w-full mt-5 border border-slate-200 text-slate-700 text-xs font-bold py-3 rounded-xl transition-all duration-200 hover:bg-[#D94E1E] hover:border-[#D94E1E] hover:text-white active:scale-[0.98]"
              >
                Ver perfil
              </button>
            </div>
          </article>

          <!-- CARD EXTRA -->
          <div
            v-if="mostrarTodosProfissionais && !mostrarResultadosBusca"
            class="hidden lg:flex rounded-3xl bg-orange-50 border border-orange-100 p-6 flex-col justify-center items-center text-center"
          >
            <div
              class="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm mb-4"
            >
              🔎
            </div>

            <h3 class="text-base font-extrabold text-slate-800">
              Encontre mais profissionais
            </h3>

            <p
              class="text-xs text-slate-500 leading-relaxed mt-2 max-w-xs"
            >
              Explore outras categorias e encontre o profissional ideal para
              o seu trabalho.
            </p>

            <button
              type="button"
              @click="focarBusca"
              class="mt-5 bg-[#D94E1E] text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-[#C34418] hover:-translate-y-0.5 transition-all active:scale-95"
            >
              Pesquisar agora
            </button>
          </div>
        </div>

        <!-- SEM RESULTADOS -->
        <div
          v-else
          class="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm"
        >
          <div
            class="w-16 h-16 mx-auto rounded-2xl bg-orange-50 flex items-center justify-center text-2xl"
          >
            🔍
          </div>

          <h3 class="text-base font-extrabold text-slate-800 mt-4">
            Nenhum profissional encontrado
          </h3>

          <p
            class="text-xs text-slate-500 mt-2 max-w-sm mx-auto"
          >
            Não encontramos profissionais para essa busca na demonstração.
            Tente pesquisar por outro serviço ou categoria.
          </p>

          <button
            type="button"
            @click="limparBusca"
            class="mt-5 bg-[#D94E1E] text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-[#C34418] transition-all active:scale-95"
          >
            Nova busca
          </button>
        </div>
      </section>

      <!-- CTA -->
      <section
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10"
      >
        <div
          class="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-8 sm:px-10 sm:py-10"
        >
          <div
            class="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#D94E1E]/20"
          ></div>

          <div
            class="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div class="max-w-xl">
              <span
                class="text-[10px] font-bold uppercase tracking-wider text-orange-300"
              >
                Para profissionais
              </span>

              <h2
                class="text-xl sm:text-2xl font-extrabold text-white mt-2"
              >
                Quer divulgar seu trabalho?
              </h2>

              <p
                class="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed"
              >
                Crie seu perfil profissional e permita que clientes encontrem
                seus serviços.
              </p>
            </div>

            <button
              type="button"
              @click="irParaCadastroEmpreendedor"
              class="shrink-0 bg-[#D94E1E] text-white text-xs font-extrabold px-6 py-3.5 rounded-xl transition-all duration-200 hover:bg-[#C34418] hover:-translate-y-1 hover:shadow-xl active:scale-[0.97]"
            >
              Divulgar meu serviço →
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- MENU INFERIOR MOBILE -->
    <nav
      class="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-8px_30px_rgba(15,23,42,0.08)]"
    >
      <div
        class="max-w-lg mx-auto px-5 py-2.5 flex items-center justify-around"
      >
        <button
          type="button"
          @click="irParaInicio"
          class="group flex flex-col items-center gap-1 px-5 py-1.5 rounded-xl text-[#D94E1E]"
        >
          <span
            class="text-lg transition-transform group-active:scale-75"
          >
            ⌂
          </span>

          <span class="text-[10px] font-bold">
            Início
          </span>
        </button>

        <button
          type="button"
          @click="focarBusca"
          class="group flex flex-col items-center gap-1 px-5 py-1.5 rounded-xl text-slate-400 hover:text-[#D94E1E] transition-colors"
        >
          <span
            class="text-lg transition-transform group-active:scale-75"
          >
            🔍
          </span>

          <span class="text-[10px] font-semibold">
            Buscar
          </span>
        </button>

        <button
          type="button"
          @click="irParaCadastroEmpreendedor"
          class="group flex flex-col items-center gap-1 px-5 py-1.5 rounded-xl text-slate-400 hover:text-[#D94E1E] transition-colors"
        >
          <span
            class="text-lg transition-transform group-active:scale-75"
          >
            🔧
          </span>

          <span class="text-[10px] font-semibold">
            Divulgar
          </span>
        </button>

        <button
          type="button"
          @click.stop="alternarConta"
          class="group flex flex-col items-center gap-1 px-5 py-1.5 rounded-xl text-slate-400 hover:text-[#D94E1E] transition-colors"
        >
          <span
            class="text-lg transition-transform group-active:scale-75"
          >
            👤
          </span>

          <span class="text-[10px] font-semibold">
            Conta
          </span>
        </button>
      </div>
    </nav>

    <!-- PAINÉIS DE CONTA E CONFIGURAÇÕES NO CELULAR -->
    <div
      v-if="mostrarConta || mostrarConfiguracoes"
      class="lg:hidden fixed inset-0 z-[80] bg-slate-900/40 flex items-end justify-center px-4 pb-24 pt-24"
      @click.self="fecharMenus"
    >
      <div class="w-full max-w-sm max-h-full overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl p-2" @click.stop>
        <template v-if="mostrarConta">
              <button v-if="usuarioLogado" type="button" @click="fecharMenus(); router.push('/cadastro/empreendedor/perfil')" class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50">📝 Rascunho profissional</button>
              <!-- ENTRAR -->
              <button
                v-if="!usuarioLogado"

                type="button"
                @click="irParaLogin"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:text-[#D94E1E] transition-colors"
              >
                👤 Entrar na conta
              </button>

              <button
                type="button"
                @click="irParaCadastro"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:text-[#D94E1E] transition-colors"
              >
                📝 Criar conta
              </button>

              <button
                type="button"
                @click="irParaCadastroEmpreendedor"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:text-[#D94E1E] transition-colors"
              >
                📋 Divulgar meu serviço
              </button>

              <div class="h-px bg-slate-100 my-1"></div>

              <button
                type="button"
                @click="fecharMenus"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                ✕ Fechar menu
              </button>
        </template>
        <template v-else>
              <div class="px-3 py-2">
                <p class="text-[10px] font-bold uppercase text-slate-400">
                  Configurações
                </p>
              </div>

              <button
                type="button"
                @click="fecharMenus(); informar('Não há notificações nesta demonstração.')"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:text-[#D94E1E] transition-colors"
              >
                🔔 Notificações
              </button>

              <button
                type="button"
                @click="fecharMenus(); informar('Esta versão utiliza o tema claro.')"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:text-[#D94E1E] transition-colors"
              >
                🌙 Aparência
              </button>

              <button
                type="button"
                @click="fecharMenus(); informar('Este protótipo usa armazenamento local no navegador para o estado de demonstração e o rascunho do perfil.')"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:text-[#D94E1E] transition-colors"
              >
                🔒 Privacidade
              </button>

              <!-- SAIR NA ENGRENAGEM -->
              <div
                v-if="usuarioLogado"
                class="h-px bg-slate-100 my-1"
              ></div>

              <button
                v-if="usuarioLogado"
                type="button"
                @click="sairDaConta"
                class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                🚪 Sair da conta
              </button>

          <button type="button" @click="fecharMenus" class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50">✕ Fechar menu</button>
        </template>
      </div>
    </div>

    <!-- MODAL DO PROFISSIONAL -->
    <div
      v-if="profissionalSelecionado"
      class="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
      @click.self="fecharPerfil"
    >
      <div
        class="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Perfil profissional"
      >
        <!-- CABEÇALHO DO MODAL -->
        <div
          class="relative bg-[#D94E1E] px-5 pt-5 pb-16"
        >
          <button
            type="button"
            @click="fecharPerfil"
            class="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors"
            aria-label="Fechar perfil"
          >
            ✕
          </button>

          <p
            class="text-[10px] uppercase tracking-wider font-bold text-white/70"
          >
            Perfil profissional
          </p>

          <h2
            class="text-xl font-extrabold text-white mt-1"
          >
            {{ profissionalSelecionado.nome }}
          </h2>

          <p class="text-xs text-white/80 mt-1">
            {{ profissionalSelecionado.profissao }}
          </p>
        </div>

        <!-- FOTO -->
        <div class="relative z-10 px-5 -mt-12">
          <div
            class="w-24 h-24 rounded-3xl border-4 border-white overflow-hidden bg-slate-200 shadow-lg"
          >
            <img
              :src="profissionalSelecionado.imagem"
              :alt="profissionalSelecionado.nome"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- INFORMAÇÕES -->
        <div class="p-5">
          <div
            class="grid grid-cols-3 divide-x divide-slate-200"
          >
            <div class="px-2 first:pl-0">
              <p class="text-[10px] text-slate-400">
                Avaliação
              </p>

              <p
                class="text-sm font-extrabold text-slate-800 mt-0.5"
              >
                ⭐ {{ profissionalSelecionado.avaliacao }}
              </p>
            </div>

            <div class="px-3">
              <p class="text-[10px] text-slate-400">
                Avaliações
              </p>

              <p
                class="text-sm font-extrabold text-slate-800 mt-0.5"
              >
                {{ profissionalSelecionado.avaliacoes }}
              </p>
            </div>

            <div class="px-3">
              <p class="text-[10px] text-slate-400">
                Categoria
              </p>

              <p
                class="text-xs font-bold text-slate-800 mt-0.5"
              >
                {{ profissionalSelecionado.categoria }}
              </p>
            </div>
          </div>

          <div class="mt-5">
            <p
              class="text-[10px] uppercase tracking-wider font-bold text-[#D94E1E]"
            >
              Localização
            </p>

            <p
              class="text-xs text-slate-600 mt-2"
            >
              📍 {{ profissionalSelecionado.bairro }}
            </p>
          </div>

          <div class="mt-5">
            <p
              class="text-[10px] uppercase tracking-wider font-bold text-[#D94E1E]"
            >
              Sobre o profissional
            </p>

            <p
              class="text-xs text-slate-500 leading-relaxed mt-2"
            >
              Profissional disponível para novos trabalhos, oferecendo
              serviços de
              {{ profissionalSelecionado.profissao.toLowerCase() }}.
            </p>
          </div>

          <div
            class="mt-5 flex items-center gap-2"
          >
            <span
              class="w-2 h-2 rounded-full bg-green-500"
            ></span>

            <span
              class="text-[11px] font-semibold text-green-600"
            >
              Disponível para novos trabalhos
            </span>
          </div>

          <button
            type="button"
            @click="fecharPerfil"
            class="w-full mt-5 bg-[#D94E1E] text-white text-xs font-extrabold py-3.5 rounded-xl hover:bg-[#C34418] transition-all active:scale-[0.98]"
          >
            Fechar perfil
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
