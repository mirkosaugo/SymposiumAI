import{n as e}from"./chunk-vNrZSFDR.js";import{s as t}from"./iframe-BTOfJEyq.js";import{D as n,b as r,d as i,t as a}from"./lucide-react-BG00CG6A.js";import{n as o,t as s}from"./button-0lgoOUBx.js";import{n as c,t as l}from"./input-KRzkKjO9.js";var u,d,f,p,m,h,g;e((()=>{u=t(),c(),o(),a(),d={title:`Components/Input`,component:l,argTypes:{type:{control:`select`,options:[`text`,`email`,`password`,`number`,`search`,`file`]},disabled:{control:`boolean`},placeholder:{control:`text`}},args:{placeholder:`Inserisci testo...`,disabled:!1,type:`text`}},f={},p={render:()=>(0,u.jsxs)(`div`,{className:`w-72 space-y-2`,children:[(0,u.jsx)(`label`,{className:`text-sm font-medium text-foreground`,children:`Email`}),(0,u.jsx)(l,{type:`email`,placeholder:`nome@azienda.com`}),(0,u.jsx)(`p`,{className:`text-xs text-muted-foreground`,children:`La tua email aziendale`})]})},m={render:()=>(0,u.jsxs)(`div`,{className:`flex w-72 flex-col gap-4`,children:[(0,u.jsxs)(`div`,{className:`space-y-1`,children:[(0,u.jsx)(`label`,{className:`text-xs font-medium text-muted-foreground`,children:`Default`}),(0,u.jsx)(l,{placeholder:`Placeholder...`})]}),(0,u.jsxs)(`div`,{className:`space-y-1`,children:[(0,u.jsx)(`label`,{className:`text-xs font-medium text-muted-foreground`,children:`Disabled`}),(0,u.jsx)(l,{placeholder:`Disabilitato`,disabled:!0})]}),(0,u.jsxs)(`div`,{className:`space-y-1`,children:[(0,u.jsx)(`label`,{className:`text-xs font-medium text-muted-foreground`,children:`Invalid`}),(0,u.jsx)(l,{placeholder:`Campo non valido`,"aria-invalid":`true`})]}),(0,u.jsxs)(`div`,{className:`space-y-1`,children:[(0,u.jsx)(`label`,{className:`text-xs font-medium text-muted-foreground`,children:`File`}),(0,u.jsx)(l,{type:`file`})]})]})},h={name:`Composizioni con icone`,render:()=>(0,u.jsxs)(`div`,{className:`flex w-80 flex-col gap-4`,children:[(0,u.jsxs)(`div`,{className:`relative`,children:[(0,u.jsx)(i,{className:`absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground`}),(0,u.jsx)(l,{className:`pl-8`,placeholder:`Cerca...`})]}),(0,u.jsxs)(`div`,{className:`relative`,children:[(0,u.jsx)(r,{className:`absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground`}),(0,u.jsx)(l,{className:`pl-8`,type:`email`,placeholder:`nome@azienda.com`})]}),(0,u.jsxs)(`div`,{className:`relative`,children:[(0,u.jsx)(l,{type:`password`,placeholder:`Password`,className:`pr-10`}),(0,u.jsx)(s,{variant:`ghost`,size:`icon-xs`,className:`absolute right-1 top-1/2 -translate-y-1/2`,children:(0,u.jsx)(n,{className:`size-3.5`})})]})]})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-72 space-y-2">
      <label className="text-sm font-medium text-foreground">Email</label>
      <Input type="email" placeholder="nome@azienda.com" />
      <p className="text-xs text-muted-foreground">
        La tua email aziendale
      </p>
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-72 flex-col gap-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground">Default</label>
        <Input placeholder="Placeholder..." />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground">Disabled</label>
        <Input placeholder="Disabilitato" disabled />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground">Invalid</label>
        <Input placeholder="Campo non valido" aria-invalid="true" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground">File</label>
        <Input type="file" />
      </div>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: "Composizioni con icone",
  render: () => <div className="flex w-80 flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-8" placeholder="Cerca..." />
      </div>
      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-8" type="email" placeholder="nome@azienda.com" />
      </div>
      {/* Password with button */}
      <div className="relative">
        <Input type="password" placeholder="Password" className="pr-10" />
        <Button variant="ghost" size="icon-xs" className="absolute right-1 top-1/2 -translate-y-1/2">
          <Eye className="size-3.5" />
        </Button>
      </div>
    </div>
}`,...h.parameters?.docs?.source}}},g=[`Default`,`WithLabel`,`States`,`WithIconComposition`]}))();export{f as Default,m as States,h as WithIconComposition,p as WithLabel,g as __namedExportsOrder,d as default};