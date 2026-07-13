import{d as t,c as s,r as o,u as a}from"../../../nitro/nitro.mjs";const e=t(async t=>{if("POST"!==t.method)throw s({statusCode:405,statusMessage:"Method Not Allowed"});const e=await o(t),r=a.env.ADMIN_SECRET;if(!r||e.password!==r)throw s({statusCode:401,statusMessage:"Senha incorreta"});return{ok:!0,token:r}});export{e as default};
//# sourceMappingURL=login.mjs.map
