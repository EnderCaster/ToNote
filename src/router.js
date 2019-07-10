const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/notebook.vue'], resolve)
    },
    {
        path:'/:notebook_uuid',
        name:'partition',
        component:(resolve)=>require(['./views/partition.vue'],resolve),
        children:[
            {
                path:':partition_name|:partition_uuid',
                name:'page',
                component:(resolve)=>require(['./views/page.vue'],resolve),
                children:[
                    {
                        path:':page_name|:page_uuid',
                        name:'edit_field',
                        component:(resolve)=>require(['./views/edit.vue'],resolve),
                    }
                ]
            }
        ]
    }
];
export default routers;