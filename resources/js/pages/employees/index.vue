<template>
  <card :title="$t('employees')">
    <template #header>
      <router-link :to="{name: 'employees.create'}" class="btn btn-sm btn-primary float-right">
        Create
      </router-link>
    </template>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            {{ $t('first_name') }}
          </th>
          <th scope="col">
            {{ $t('last_name') }}
          </th>
          <th scope="col">
            {{ $t('email') }}
          </th>
          <th scope="col">
            {{ $t('phone') }}
          </th>
          <th scope="col">
            {{ $t('salary') }}
          </th>
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <th scope="row">
            {{ employee.id }}
          </th>
          <td>{{ employee.first_name }}</td>
          <td>{{ employee.last_name }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.phone }}</td>
          <td>${{ employee.salary }}</td>
          <td>
            <router-link :to="{name: 'employees.edit', params: {id: employee.id}}" class="btn btn-sm btn-info">
              Edit
            </router-link>
            <button class="btn btn-sm btn-danger" @click.prevent="removeEmployee(employee.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <paginate
      v-model="page"
      :page-count="meta.last_page"
      :page-range="5"
      :margin-pages="3"
      :click-handler="clickCallback"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      page-link-class="page-link"
      next-class="page-item"
      next-link-class="page-link"
      prev-class="page-item"
      prev-link-class="page-link"
    />
  </card>
</template>

<script>
import Paginate from 'vuejs-paginate'
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import i18n from '~/plugins/i18n'

export default {
  components: { Paginate },
  middleware: 'auth',
  computed: {
    ...mapGetters('employee', ['employees'])
  },
  data () {
    return {
      page: 1,
      meta: {
        last_page: 1
      }
    }
  },
  watch: {
    page: {
      handler (page) {
        this.getEmployees(page).then(r => {
          this.meta = r.meta
        })
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('employee', ['getEmployees', 'deleteEmployee']),
    clickCallback (page) {
      this.page = page
    },
    removeEmployee (id) {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        reverseButtons: true,
        showCancelButton: true,
        confirmButtonText: i18n.t('ok'),
        cancelButtonText: i18n.t('cancel')
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteEmployee(id)
          Swal.fire('Deleted!', '', 'success')
        }
      })
    }
  }
}
</script>
