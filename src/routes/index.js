// import NotFoundPage from '../components/NotFoundPage';
import React from 'react';

const routesConfigs = [
    { name: "Home", path: "/", component: "IndexPage" },
    { name: "ProjectListing" , path:"/projects/list(/:page)" , component : "ProjectListing"},
    { name: "BlogListing" , path:"/blogs/list(/:page)" , component : "BlogListing"},    
    { name: "BlogDetail" , path : "/blog(/:slug)(/:id)" , component : "BlogDetail"},
    { name: "ProjectDetail" , path : "/project(/:slug)(/:id)" , component : "ProjectDetail"},

    { name: "Info" , path:"/info" , component : "Info"},
    { name: "Profile" , path:"/profile" , component : "Profile"},    
    { name: "wishlist" , path:"/wishlist" , component : "WishList"},    
    { name: "About Us" , path:"/about" , component : "About"},    
    { name:"Contact " , path: "/contact" , component : "Contact"},
    { name: "503 error" , path:"/503" , component: "ErrorPage"},
    { name:"" , path: "*" , component : "NotFoundPage"}
]

if (typeof require.ensure !== 'function') require.ensure = function (d, c) { c(require) }

const asyncLoad = function (component , callback) {
    switch (component) {
        case 'IndexPage':
            require.ensure([], require => {
                callback(null, require('../si/pages/IndexPage').default)
            }, 'IndexPage');

        case 'ProjectListing':    
            return require.ensure([], require => {
                    callback(null, require('../si/pages/ProjectListing').default)
                }, 'ProjectListing');

        case 'BlogListing':    
            return require.ensure([], require => {
                callback(null, require('../si/pages/BlogListing').default)
            }, 'BlogListing');
        
        case 'BlogDetail':    
            return require.ensure([], require => {
                callback(null, require('../si/pages/BlogDetail').default)
            }, 'BlogDetail');

        case 'ProjectDetail':    
            return require.ensure([], require => {
                callback(null, require('../si/pages/ProjectDetail').default)
            }, 'ProjectDetail');

        case 'Info':    
            return require.ensure([], require => {
                callback(null, require('../si/pages/home/info').default)
            }, 'info');

        case 'Profile':    
            return require.ensure([], require => {
                callback(null, require('../si/pages/home/profile').default)
            }, 'profile');

        case 'WishList':    
            return require.ensure([], require => {
                callback(null, require('../si/pages/home/wishlist').default)
            }, 'wishlist');

        case 'About':    
            return require.ensure([], require => {
                callback(null, require('../si/pages/About').default)
            }, 'About');

            case 'Contact':    
            return require.ensure([], require => {
                callback(null, require('../si/pages/Contact-Us').default)
            }, 'Contact');
        case 'ErrorPage':    
            return require.ensure([], require => {
                callback(null, require('../si/pages/ErrorPage').default)
            }, 'ErrorPage');

        case 'NotFoundPage':    
            return require.ensure([], require => {
                    callback(null, require('../si/pages/NotFoundPage').default)
                }, 'NotFoundPage');
            
    }
}

export { routesConfigs, asyncLoad }