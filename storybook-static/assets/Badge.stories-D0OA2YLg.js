import{n as e}from"./chunk-vNrZSFDR.js";import{s as t}from"./iframe-BTOfJEyq.js";import{_ as n,a as r,n as i,o as a,t as o,y as s}from"./utils-BSCHhu3v.js";import{n as c,t as l}from"./dist-BH0SM1aP.js";import{A as u,P as d,n as f,o as p,t as m}from"./lucide-react-BG00CG6A.js";function h(e){return a(e.defaultTagName??`div`,e,e)}var g=e((()=>{r()})),_=e((()=>{g()}));function v({className:e,variant:t=`default`,render:n,...r}){return h({defaultTagName:`span`,props:s({className:o(y({variant:t}),e)},r),render:n,state:{slot:`badge`,variant:t}})}var y,b=e((()=>{n(),_(),c(),i(),y=l(`group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!`,{variants:{variant:{default:`bg-primary text-primary-foreground [a]:hover:bg-primary/80`,secondary:`bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80`,destructive:`bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20`,outline:`border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground`,ghost:`hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50`,link:`text-primary underline-offset-4 hover:underline`}},defaultVariants:{variant:`default`}})})),x,S,C,w,T,E,D,O;e((()=>{x=t(),b(),m(),S={title:`Components/Badge`,component:v,argTypes:{variant:{control:`select`,options:[`default`,`secondary`,`destructive`,`outline`,`ghost`,`link`]}},args:{variant:`default`}},C={args:{children:`Badge`}},w={render:()=>(0,x.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,x.jsx)(v,{variant:`default`,children:`Default`}),(0,x.jsx)(v,{variant:`secondary`,children:`Secondary`}),(0,x.jsx)(v,{variant:`destructive`,children:`Destructive`}),(0,x.jsx)(v,{variant:`outline`,children:`Outline`}),(0,x.jsx)(v,{variant:`ghost`,children:`Ghost`}),(0,x.jsx)(v,{variant:`link`,children:`Link`})]})},T={render:()=>(0,x.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,x.jsxs)(v,{children:[(0,x.jsx)(u,{className:`size-2 fill-current`,"data-icon":`inline-start`}),`Online`]}),(0,x.jsxs)(v,{variant:`destructive`,children:[(0,x.jsx)(p,{"data-icon":`inline-start`}),`Errore`]}),(0,x.jsxs)(v,{variant:`secondary`,children:[(0,x.jsx)(d,{"data-icon":`inline-start`}),`Completato`]}),(0,x.jsxs)(v,{variant:`outline`,children:[`Tag`,(0,x.jsx)(f,{"data-icon":`inline-end`})]})]})},E={name:`Status Indicators`,render:()=>(0,x.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,x.jsxs)(v,{className:`bg-emerald-500/10 text-emerald-500 border-emerald-500/20`,children:[(0,x.jsx)(u,{className:`size-1.5 fill-current`}),` Active`]}),(0,x.jsxs)(v,{className:`bg-amber-500/10 text-amber-500 border-amber-500/20`,children:[(0,x.jsx)(u,{className:`size-1.5 fill-current`}),` Pending`]}),(0,x.jsxs)(v,{variant:`destructive`,children:[(0,x.jsx)(u,{className:`size-1.5 fill-current`}),` Error`]}),(0,x.jsxs)(v,{variant:`secondary`,children:[(0,x.jsx)(u,{className:`size-1.5 fill-current`}),` Idle`]})]})},D={name:`Node Tags (Canvas Pattern)`,render:()=>(0,x.jsxs)(`div`,{className:`flex flex-wrap items-center gap-1.5`,children:[(0,x.jsx)(v,{variant:`secondary`,className:`text-[10px] h-4`,children:`design`}),(0,x.jsx)(v,{variant:`secondary`,className:`text-[10px] h-4`,children:`branding`}),(0,x.jsx)(v,{variant:`secondary`,className:`text-[10px] h-4`,children:`UI/UX`}),(0,x.jsx)(v,{variant:`outline`,className:`text-[10px] h-4 border-dashed`,children:`+ add`})]})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Badge"
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge>
        <Circle className="size-2 fill-current" data-icon="inline-start" />
        Online
      </Badge>
      <Badge variant="destructive">
        <AlertTriangle data-icon="inline-start" />
        Errore
      </Badge>
      <Badge variant="secondary">
        <Check data-icon="inline-start" />
        Completato
      </Badge>
      <Badge variant="outline">
        Tag
        <X data-icon="inline-end" />
      </Badge>
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: "Status Indicators",
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
        <Circle className="size-1.5 fill-current" /> Active
      </Badge>
      <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">
        <Circle className="size-1.5 fill-current" /> Pending
      </Badge>
      <Badge variant="destructive">
        <Circle className="size-1.5 fill-current" /> Error
      </Badge>
      <Badge variant="secondary">
        <Circle className="size-1.5 fill-current" /> Idle
      </Badge>
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: "Node Tags (Canvas Pattern)",
  render: () => <div className="flex flex-wrap items-center gap-1.5">
      <Badge variant="secondary" className="text-[10px] h-4">design</Badge>
      <Badge variant="secondary" className="text-[10px] h-4">branding</Badge>
      <Badge variant="secondary" className="text-[10px] h-4">UI/UX</Badge>
      <Badge variant="outline" className="text-[10px] h-4 border-dashed">+ add</Badge>
    </div>
}`,...D.parameters?.docs?.source}}},O=[`Default`,`AllVariants`,`WithIcons`,`StatusIndicators`,`NodeTags`]}))();export{w as AllVariants,C as Default,D as NodeTags,E as StatusIndicators,T as WithIcons,O as __namedExportsOrder,S as default};