<script setup lang="ts">
import { useCountryQuery } from '@/generated/operations'
const { result, loading } = await useCountryQuery()
</script>

<template>
  <div>
    <div>
      <h3 text-2xl font-500>
        Graphql Api
      </h3>
      <div v-if="loading">
        loading
      </div>
      <div v-else>
        Hello {{ result.country.name }}
      </div>

      <div>
        <NuxtLink
          class="btn m-3 text-sm"
          to="/restful/page-view"
        >
          RESTful Api
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
