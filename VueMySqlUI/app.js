const routes=[
    {path:'/home',component:home},
    {path:'/employee',component:employee},
    {path:'/department',component:department}
]

const app = new Vue({
    router
}).$mount('#app')
