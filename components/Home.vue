<script setup lang="ts">
import { useCountryQuery, useHelloQuery } from '@/generated/operations'
const { result: server, loading: jumpLoading } = await useCountryQuery({
})

const { result: client, loading: queryLoading } = await useHelloQuery({
  clientId: 'local',
  prefetch: false, // need check result in template
})
const { $apollo } = useNuxtApp()

</script>

<template>
  <div>
    <div>
      <h3 text-2xl font-500>
        Graphql Api
      </h3>
      <div v-if="queryLoading">
        Loading when client only
      </div>
      <div v-else-if="client && client.hello">
        Client only: {{ client.hello }}
      </div>

      <div v-if="jumpLoading">
        Loading when jump from other landing page
      </div>
      <div v-else-if="server && server.country">
        Prefetch on landing page: {{ server.country.name }}
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
