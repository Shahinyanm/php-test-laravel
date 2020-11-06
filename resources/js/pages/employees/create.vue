<template>
  <card :title="$t('employees')">
    <form @submit.prevent="create" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('info_created')" />

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">{{ $t('first_name') }}</label>
        <div class="col-md-7">
          <input v-model="form.first_name" :class="{ 'is-invalid': form.errors.has('first_name') }" class="form-control" type="text" name="first_name">
          <has-error :form="form" field="first_name" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">{{ $t('last_name') }}</label>
        <div class="col-md-7">
          <input v-model="form.last_name" :class="{ 'is-invalid': form.errors.has('last_name') }" class="form-control" type="text" name="last_name">
          <has-error :form="form" field="last_name" />
        </div>
      </div>

      <!-- Email -->
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">{{ $t('email') }}</label>
        <div class="col-md-7">
          <input v-model="form.email" :class="{ 'is-invalid': form.errors.has('email') }" class="form-control" type="email" name="email">
          <has-error :form="form" field="email" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">{{ $t('phone') }}</label>
        <div class="col-md-7">
          <input v-model="form.phone" :class="{ 'is-invalid': form.errors.has('phone') }" class="form-control" type="text" name="phone">
          <has-error :form="form" field="phone" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">{{ $t('salary') }}</label>
        <div class="col-md-7">
          <input v-model="form.salary" :class="{ 'is-invalid': form.errors.has('salary') }" class="form-control" type="text" name="salary">
          <has-error :form="form" field="salary" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group row">
        <div class="col-md-9 ml-md-auto">
          <v-button :loading="form.busy" type="success">
            {{ $t('create') }}
          </v-button>
        </div>
      </div>
    </form>
  </card>
</template>

<script>
import Form from 'vform'

export default {
  middleware: 'auth',
  data: () => ({
    form: new Form({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      salary: 0
    })
  }),
  methods: {
    async create () {
      await this.form.post('/employees')
      this.form.reset()
    }
  }
}
</script>
