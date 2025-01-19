<template>
  <va-modal v-model="showModal" @ok="onConfirmed" @close="onCanceled" stateful close-button hideDefaultActions blur
    fixed-layout class="w-full" :mobileFullscreen="false">
    <div class="p-2">
      <h2 class="text-xl font-semibold mb-4 flex content-center">
        <VaIcon class="mr-2" name="redeem" size="1.5rem" /> Adicionar Presente

      </h2>

      <va-form ref="form" class="space-y-4 grid grid-cols-2 gap-4">
        <!-- Campo Título -->
        <div class="col-span-2">
          <va-input v-model="form.title" label="Título" placeholder="Digite o título do presente" required
            class="w-full" :rules="[(v) => v.length > 3 || `Coloque um título`]" />
        </div>

        <!-- Campo Descrição -->
        <div class="col-span-2">
          <va-textarea max-length="100" v-model="form.description" label="Descrição"
            placeholder="Descreva o presente, inclua links etc." required rows="4" class="w-full" required-mark :rules="[
              (v) => v && v.length > 0 || 'Coloque alguma descrição',
              (v) => v && v.length < 100,
            ]" />
        </div>

        <!-- Campo Preço Estimado -->
        <div>
          <va-input v-model="form.estimatedPrice" label="Preço Estimado" placeholder="Insira o preço estimado" required
            class="w-full">
          </va-input>

        </div>

        <!-- Campo Categoria -->
        <div>
          <VaSelect v-model="catValue" :options="categories" label="Categoria" text-by="label" track-by="value"
            placeholder="Selecione uma categoria" required class="w-full" />
        </div>

        <!-- Campo Imagem -->
        <div class="col-span-2">
          <VaFileUpload dropZoneText="Arraste sua imagem para fazer upload ou" v-model="file" dropzone
            file-types="jpg,png, jpeg" fileIncorrectMessage="O tipo de arquivo está incorreto" type="single"
            uploadButtonText="Carregar Imagem" />
        </div>

        <!-- Campo Prioridade -->
        <div class="flex items-center col-span-2">
          <VaSwitch off-color="#919191" v-model="form.priority" label="Marcar como prioridade 🔥"
            style="--va-switch-checker-background-color: #292929;" />
        </div>

        <!-- Botões de Ação -->
        <div class="flex justify-end space-x-3 col-span-2">
          <va-button class="w-full" size="large" type="button" color="secondary" @click="onCanceled" preset="secondary"
            hover-behavior="opacity" :hover-opacity="0.4">
            Cancelar
          </va-button>
          <va-button :loading="loading" :disabled="loading" class="w-full" size="large" type="submit" color="primary"
            @click="prepareSave">
            Salvar
          </va-button>
        </div>
      </va-form>
    </div>
  </va-modal>
</template>

<style></style>

<script>

import axios from 'axios';
export default {
  data() {
    const categories = [
      { label: 'Eletrônicos', value: 1 },
      { label: 'Roupas', value: 2 },
      { label: 'Decoração', value: 3 },
      { label: 'Livros', value: 4 },
      { label: 'Jogos', value: 5 },
      { label: 'Utensílios Domésticos', value: 6 },
      { label: 'Viagens', value: 7 },
      { label: 'Experiências', value: 8 },
      { label: 'Outros', value: 9 },
      { label: 'Brinquedos', value: 10 },
    ];

    return {
      showModal: false,
      form: {
        title: '',
        description: '',
        imageUrl: null,
        estimatedPrice: 0,
        category: 9,
        priority: false,
      },
      categories,
      savedItems: [],
      file: [],
      catValue: categories[8],
      loading: false,
    };
  },
  computed: {
    currentTab() {
      return this.tabs.find(({ title }) => title === this.tabIndex);
    },
  },
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    isActive: function (newVal) {
      this.showModal = newVal;
    },
    showModal: function (newVal) {
      if (!newVal) {
        this.$emit('canceled');
      }
    },
  },
  methods: {
    test(valor) {
      console.log(valor);
      onsole.log(valor.target.value)
    },

    onConfirmed() {
      this.$emit('confirmed');
    },
    onCanceled() {
      this.$emit('canceled');
      this.resetForm();
    },

    saveState() {
      /*    // Recupera os itens existentes do localStorage
         const existingItems = JSON.parse(localStorage.getItem('formItems')) || [];
   
         // Adiciona o novo formulário à lista existente
         existingItems.push({ ...this.form });
   
         // Atualiza o localStorage com a lista atualizada
         localStorage.setItem('formItems', JSON.stringify(existingItems));
   
         console.log(this.form);
   
         // Reseta o formulário e oculta o modal */
      this.resetForm();
    },


    resetForm() {
      // Limpa os dados do formulário
      this.form = {
        title: '',
        description: '',
        imageUrl: null,
        estimatedPrice: 0,
        category: 9,
        priority: false,
      };
      this.file = []
    },

    clearSavedItems() {
      // Limpa a lista de itens salvos e o localStorage
      this.savedItems = [];
      localStorage.removeItem('formItems');
    },

    async saveForm() {
      this.form.category = this.catValue.value;
      this.form.estimatedPrice = parseFloat(this.form.estimatedPrice);

      try {
        const response = await axios.post('https://gablivgift-ws.onrender.com/gabliv/api/v1/gift/create-gift', this.form, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.status === 200) {
          this.saveState(); // Chama o método saveState após a resposta bem-sucedida
          this.onConfirmed() ;
        } else {
          // Caso a resposta seja um erro
          console.error('Erro ao salvar o presente:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
      }
    },


    prepareFormData() {
      this.formData = new FormData();
      this.formData.append('file', this.file);
      this.formData.append('upload_preset', 'pre-gifts');
    },

    async prepareSave() {
      this.loading = true;

      if (!this.file || !this.file.name) {
        await this.saveForm();
        this.loading = false;
        this.showModal = false;
        this.$router.push({ name: 'gift' });
        return;
      }

      if (this.file.size >= 5000000 || !this.file.type.startsWith('image/')) {
        alert('Arquivo inválido. Escolha uma imagem de até 5MB.');
        this.loading = false;
        return;
      }

      try {
        const reader = new FileReader();

        reader.onload = async () => {
          this.fileContents = reader.result;

          try {
            this.prepareFormData();

            const response = await axios.post(`https://api.cloudinary.com/v1_1/dv8vjjalo/upload`, this.formData);

            this.results = response.data;
            console.log('public_id', this.results.public_id);

            this.form.imageUrl = this.results.secure_url;

            await this.saveForm();
          } catch (error) {
            console.error('Erro ao enviar a imagem para o Cloudinary:', error);
            alert('Erro ao enviar a imagem. Tente novamente mais tarde.');
          } finally {
            this.loading = false;
            this.showModal = false;
            this.$router.push({ name: 'gift' });
          }
        };

        // Iniciar a leitura do arquivo
        reader.readAsDataURL(this.file);
      } catch (error) {
        console.error('Erro ao processar o arquivo:', error);
        alert('Erro ao processar o arquivo. Tente novamente mais tarde.');
        this.loading = false;
        this.showModal = false;
      }
    }

  },
};
</script>
