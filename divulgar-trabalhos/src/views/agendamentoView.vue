<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const profissional = ref(null)

const data = ref('')
const hora = ref('')
const observacao = ref('')

const carregando = ref(true)
const agendando = ref(false)

const erro = ref('')
const sucesso = ref('')

async function carregarProfissional() {
  try {
    carregando.value = true
    erro.value = ''

    const resposta = await fetch(
      `http://localhost:3000/api/profissionais/${route.params.id}`
    )

    const dados = await resposta.json()

    console.log('Profissional carregado:', dados)

    if (!resposta.ok) {
      throw new Error(
        dados.erro || 'Não foi possível carregar o profissional.'
      )
    }

    profissional.value = dados
  } catch (error) {
    console.error('Erro ao carregar profissional:', error)
    erro.value = error.message
  } finally {
    carregando.value = false
  }
}

async function agendar() {
  erro.value = ''
  sucesso.value = ''

  if (!data.value || !hora.value) {
    erro.value = 'Informe a data e o horário.'
    return
  }

  const usuarioLogado = localStorage.getItem('usuarioLogado')
  const usuarioSalvo = localStorage.getItem('usuario')

  console.log('usuarioLogado:', usuarioLogado)
  console.log('usuario salvo:', usuarioSalvo)
  console.log('profissional:', profissional.value)

  if (usuarioLogado !== 'true' || !usuarioSalvo) {
    erro.value = 'Você precisa estar logado para fazer um agendamento.'
    return
  }

  let usuario

  try {
    usuario = JSON.parse(usuarioSalvo)
  } catch (error) {
    console.error('Erro ao ler usuário:', error)

    erro.value = 'Não foi possível identificar sua conta.'
    return
  }

  if (!usuario.id) {
    erro.value = 'Usuário sem ID. Faça login novamente.'
    return
  }

  if (!profissional.value || !profissional.value.id) {
    erro.value = 'Profissional sem ID.'
    return
  }

  const dadosAgendamento = {
    cliente_id: usuario.id,
    profissional_id: profissional.value.id,
    data_hora_inicio: `${data.value}T${hora.value}:00`,
    observacao: observacao.value.trim()
  }

  console.log('Enviando agendamento:', dadosAgendamento)

  agendando.value = true

  try {
    const resposta = await fetch(
      'http://localhost:3000/api/agendamentos',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(dadosAgendamento)
      }
    )

    const dados = await resposta.json()

    console.log(
      'Resposta do servidor:',
      resposta.status,
      dados
    )

    if (!resposta.ok) {
      erro.value =
        dados.erro ||
        dados.mensagem ||
        'Não foi possível realizar o agendamento.'

      return
    }

    sucesso.value = 'Agendamento realizado com sucesso!'

    data.value = ''
    hora.value = ''
    observacao.value = ''

  } catch (error) {
    console.error('Erro na requisição:', error)

    erro.value =
      'Não foi possível conectar ao servidor.'
  } finally {
    agendando.value = false
  }
}

function voltar() {
  router.push(`/profissional/${route.params.id}`)
}

onMounted(() => {
  carregarProfissional()
})
</script>


<template>

  <div
    class="min-h-screen bg-slate-100 p-6"
  >

    <div
      class="max-w-xl mx-auto"
    >

      <!-- VOLTAR -->

      <button
        @click="voltar"
        class="mb-5 text-sm font-bold text-slate-600 hover:text-[#D94E1E]"
      >
        ← Voltar
      </button>


      <!-- CARREGANDO -->

      <div
        v-if="carregando"
        class="bg-white rounded-3xl p-8 text-center shadow"
      >
        Carregando profissional...
      </div>


      <!-- ERRO -->

      <div
        v-else-if="erro && !profissional"
        class="bg-white rounded-3xl p-8 text-center shadow"
      >

        <h2
          class="text-xl font-bold text-red-600"
        >
          Não foi possível carregar
        </h2>

        <p class="mt-2 text-slate-500">
          {{ erro }}
        </p>

      </div>


      <!-- FORMULÁRIO -->

      <div
        v-else
        class="bg-white rounded-3xl shadow-xl p-6"
      >

        <div
          class="mb-6"
        >

          <p
            class="text-xs uppercase font-bold text-[#D94E1E]"
          >
            Agendamento
          </p>

          <h1
            class="text-2xl font-extrabold text-slate-800 mt-1"
          >
            {{ profissional?.nome }}
          </h1>

          <p
            class="text-sm text-slate-500 mt-1"
          >
            {{ profissional?.profissao }}
          </p>

        </div>


        <!-- SUCESSO -->

        <div
          v-if="sucesso"
          class="mb-5 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm font-semibold"
        >
          {{ sucesso }}
        </div>


        <!-- ERRO -->

        <div
          v-if="erro"
          class="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm font-semibold"
        >
          {{ erro }}
        </div>


        <!-- DATA -->

        <label
          class="block text-sm font-bold text-slate-700 mb-2"
        >
          Data
        </label>

        <input
          v-model="data"
          type="date"
          class="w-full border border-slate-200 rounded-xl px-4 py-3 mb-5 outline-none focus:border-[#D94E1E]"
        />


        <!-- HORÁRIO -->

        <label
          class="block text-sm font-bold text-slate-700 mb-2"
        >
          Horário
        </label>

        <input
          v-model="horario"
          type="time"
          class="w-full border border-slate-200 rounded-xl px-4 py-3 mb-5 outline-none focus:border-[#D94E1E]"
        />


        <!-- OBSERVAÇÃO -->

        <label
          class="block text-sm font-bold text-slate-700 mb-2"
        >
          Observação
        </label>

        <textarea
          v-model="observacao"
          rows="4"
          placeholder="Descreva o que você precisa..."
          class="w-full border border-slate-200 rounded-xl px-4 py-3 mb-6 outline-none focus:border-[#D94E1E] resize-none"
        ></textarea>


        <!-- BOTÃO -->

        <button
          @click="agendar"
          :disabled="enviando"
          class="w-full bg-[#D94E1E] text-white font-extrabold py-4 rounded-xl hover:bg-[#C34418] transition disabled:opacity-50"
        >

          {{
            enviando
              ? 'Agendando...'
              : 'Confirmar agendamento'
          }}

        </button>

      </div>

    </div>

  </div>

</template>