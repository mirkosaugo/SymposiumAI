import{n as e,o as t}from"./chunk-vNrZSFDR.js";import{t as n}from"./react-KkzZQhs-.js";import{s as r}from"./iframe-BTOfJEyq.js";import{D as i,E as a,a as o,h as s,n as c,o as l,t as u}from"./utils-BSCHhu3v.js";import{i as ee,n as d,r as f,t as p}from"./useIsoLayoutEffect-HPKEMewT.js";import{a as te,d as m,f as h,i as g,n as _,o as v,r as y,s as b}from"./useTimeout-BmTkvTg3.js";import{t as x}from"./noop-CTVo6VP9.js";function S(){let e=C.useContext(w);if(e===void 0)throw Error(a(13));return e}var C,w,T=e((()=>{i(),C=t(n()),w=C.createContext(void 0)})),E,D=e((()=>{E={imageLoadingStatus:()=>null}})),O,k,A,ne=e((()=>{O=t(n()),o(),T(),D(),k=r(),A=O.forwardRef(function(e,t){let{className:n,render:r,...i}=e,[a,o]=O.useState(`idle`),s={imageLoadingStatus:a},c=O.useMemo(()=>({imageLoadingStatus:a,setImageLoadingStatus:o}),[a,o]),u=l(`span`,e,{state:s,ref:t,props:i,stateAttributesMapping:E});return(0,k.jsx)(w.Provider,{value:c,children:u})})}));function re(e,{referrerPolicy:t,crossOrigin:n}){let[r,i]=j.useState(`idle`);return d(()=>{if(!e)return i(`error`),s;let r=!0,a=new window.Image,o=e=>()=>{r&&i(e)};return i(`loading`),a.onload=o(`loaded`),a.onerror=o(`error`),t&&(a.referrerPolicy=t),a.crossOrigin=n??null,a.src=e,()=>{r=!1}},[e,n,t]),r}var j,M=e((()=>{j=t(n()),p(),x()})),N,P,F,I=e((()=>{N=t(n()),f(),p(),o(),T(),D(),v(),m(),g(),M(),P={...E,...h},F=N.forwardRef(function(e,t){let{className:n,render:r,onLoadingStatusChange:i,referrerPolicy:a,crossOrigin:o,...s}=e,c=S(),u=re(e.src,{referrerPolicy:a,crossOrigin:o}),f=u===`loaded`,{mounted:p,transitionStatus:m,setMounted:h}=te(f),g=N.useRef(null),_=ee(e=>{i?.(e),c.setImageLoadingStatus(e)});d(()=>{u!==`idle`&&_(u)},[u,_]);let v={imageLoadingStatus:u,transitionStatus:m};b({open:f,ref:g,onComplete(){f||h(!1)}});let y=l(`img`,e,{state:v,ref:[t,g],props:s,stateAttributesMapping:P,enabled:p});return p?y:null})})),L,R,ie=e((()=>{L=t(n()),_(),o(),T(),D(),R=L.forwardRef(function(e,t){let{className:n,render:r,delay:i,...a}=e,{imageLoadingStatus:o}=S(),[s,c]=L.useState(i===void 0),u=y();return L.useEffect(()=>(i!==void 0&&u.start(i,()=>c(!0)),u.clear),[u,i]),l(`span`,e,{state:{imageLoadingStatus:o},ref:t,props:a,stateAttributesMapping:E,enabled:o!==`loaded`&&s})})})),ae=e((()=>{ne(),I(),ie()})),oe=e((()=>{ae()}));function z({className:e,size:t=`default`,...n}){return(0,G.jsx)(A,{"data-slot":`avatar`,"data-size":t,className:u(`group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten`,e),...n})}function B({className:e,...t}){return(0,G.jsx)(F,{"data-slot":`avatar-image`,className:u(`aspect-square size-full rounded-full object-cover`,e),...t})}function V({className:e,...t}){return(0,G.jsx)(R,{"data-slot":`avatar-fallback`,className:u(`flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs`,e),...t})}function H({className:e,...t}){return(0,G.jsx)(`span`,{"data-slot":`avatar-badge`,className:u(`absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none`,`group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden`,`group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2`,`group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2`,e),...t})}function U({className:e,...t}){return(0,G.jsx)(`div`,{"data-slot":`avatar-group`,className:u(`group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background`,e),...t})}function W({className:e,...t}){return(0,G.jsx)(`div`,{"data-slot":`avatar-group-count`,className:u(`relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3`,e),...t})}var G,se=e((()=>{G=r(),oe(),c(),z.__docgenInfo={description:``,methods:[],displayName:`Avatar`,props:{size:{required:!1,tsType:{name:`union`,raw:`"default" | "sm" | "lg"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"sm"`},{name:`literal`,value:`"lg"`}]},description:``,defaultValue:{value:`"default"`,computed:!1}}}},B.__docgenInfo={description:``,methods:[],displayName:`AvatarImage`},V.__docgenInfo={description:``,methods:[],displayName:`AvatarFallback`},U.__docgenInfo={description:``,methods:[],displayName:`AvatarGroup`},W.__docgenInfo={description:``,methods:[],displayName:`AvatarGroupCount`},H.__docgenInfo={description:``,methods:[],displayName:`AvatarBadge`}})),K,q,J,Y,X,Z,Q,$;e((()=>{K=r(),se(),q={title:`Components/Avatar`,component:z,argTypes:{size:{control:`select`,options:[`sm`,`default`,`lg`]}},args:{size:`default`}},J={render:e=>(0,K.jsx)(z,{...e,children:(0,K.jsx)(V,{children:`MR`})})},Y={render:()=>(0,K.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,K.jsx)(z,{size:`sm`,children:(0,K.jsx)(V,{children:`S`})}),(0,K.jsx)(z,{size:`default`,children:(0,K.jsx)(V,{children:`MD`})}),(0,K.jsx)(z,{size:`lg`,children:(0,K.jsx)(V,{children:`LG`})})]})},X={render:()=>(0,K.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,K.jsxs)(z,{size:`default`,children:[(0,K.jsx)(V,{children:`MR`}),(0,K.jsx)(H,{})]}),(0,K.jsxs)(z,{size:`lg`,children:[(0,K.jsx)(V,{children:`AL`}),(0,K.jsx)(H,{})]})]})},Z={render:()=>(0,K.jsxs)(U,{children:[(0,K.jsx)(z,{children:(0,K.jsx)(V,{children:`MR`})}),(0,K.jsx)(z,{children:(0,K.jsx)(V,{children:`AL`})}),(0,K.jsx)(z,{children:(0,K.jsx)(V,{children:`GC`})}),(0,K.jsx)(W,{children:`+5`})]})},Q={render:()=>(0,K.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,K.jsxs)(z,{size:`sm`,children:[(0,K.jsx)(B,{src:`https://api.dicebear.com/9.x/initials/svg?seed=M`,alt:`M`}),(0,K.jsx)(V,{children:`M`})]}),(0,K.jsxs)(z,{children:[(0,K.jsx)(B,{src:`https://api.dicebear.com/9.x/initials/svg?seed=MR`,alt:`MR`}),(0,K.jsx)(V,{children:`MR`})]}),(0,K.jsxs)(z,{size:`lg`,children:[(0,K.jsx)(B,{src:`https://api.dicebear.com/9.x/initials/svg?seed=Flow`,alt:`FL`}),(0,K.jsx)(V,{children:`FL`})]})]})},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: args => <Avatar {...args}>
      <AvatarFallback>MR</AvatarFallback>
    </Avatar>
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>S</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Avatar size="default">
        <AvatarFallback>MR</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>AL</AvatarFallback>
        <AvatarBadge />
      </Avatar>
    </div>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <AvatarGroup>
      <Avatar>
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>GC</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+5</AvatarGroupCount>
    </AvatarGroup>
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarImage src="https://api.dicebear.com/9.x/initials/svg?seed=M" alt="M" />
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://api.dicebear.com/9.x/initials/svg?seed=MR" alt="MR" />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://api.dicebear.com/9.x/initials/svg?seed=Flow" alt="FL" />
        <AvatarFallback>FL</AvatarFallback>
      </Avatar>
    </div>
}`,...Q.parameters?.docs?.source}}},$=[`WithFallback`,`AllSizes`,`WithBadge`,`Group`,`WithImage`]}))();export{Y as AllSizes,Z as Group,X as WithBadge,J as WithFallback,Q as WithImage,$ as __namedExportsOrder,q as default};