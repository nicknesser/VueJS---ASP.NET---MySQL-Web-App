const routes=[
    {path:'/home',component:home},
    {path:'/employee',component:employee},
    {path:'/department',component:department}
]

/*initialize the router, use the router, mount the app*/

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
  })
  const app = Vue.createApp({})
  app.use(router)
  app.mount('#app')

  /* Old code, dated based on VueJS 2*
  const router = new VueRouter({
    routes
})

const app = new Vue({
    router
}).$mount('#app')*/


/*pulled from VueJS 3* docs
const app = createApp({
    data() {
      return {
        count: 0
      }
    }
  })
  
  app.mount('#app')*/
