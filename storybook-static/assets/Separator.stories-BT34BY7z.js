import{n as e}from"./chunk-vNrZSFDR.js";import{s as t}from"./iframe-BTOfJEyq.js";import{n,t as r}from"./separator-DsM4C1eh.js";var i,a,o,s,c,l;e((()=>{i=t(),n(),a={title:`Components/Separator`,component:r},o={render:()=>(0,i.jsxs)(`div`,{className:`w-80 space-y-3`,children:[(0,i.jsx)(`p`,{className:`text-sm font-medium text-foreground`,children:`Sezione superiore`}),(0,i.jsx)(r,{}),(0,i.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Sezione inferiore`})]})},s={render:()=>(0,i.jsxs)(`div`,{className:`flex h-8 items-center gap-3`,children:[(0,i.jsx)(`span`,{className:`text-sm text-foreground`,children:`Elemento A`}),(0,i.jsx)(r,{orientation:`vertical`}),(0,i.jsx)(`span`,{className:`text-sm text-foreground`,children:`Elemento B`}),(0,i.jsx)(r,{orientation:`vertical`}),(0,i.jsx)(`span`,{className:`text-sm text-foreground`,children:`Elemento C`})]})},c={name:`In Content Block`,render:()=>(0,i.jsxs)(`div`,{className:`w-72 rounded-xl border border-border p-4`,children:[(0,i.jsx)(`h4`,{className:`text-sm font-semibold text-foreground`,children:`Titolo sezione`}),(0,i.jsx)(`p`,{className:`mt-1 text-xs text-muted-foreground`,children:`Descrizione breve del contenuto`}),(0,i.jsx)(r,{className:`my-3`}),(0,i.jsxs)(`div`,{className:`flex items-center justify-between text-xs`,children:[(0,i.jsx)(`span`,{className:`text-muted-foreground`,children:`Status`}),(0,i.jsx)(`span`,{className:`font-medium text-foreground`,children:`Attivo`})]}),(0,i.jsx)(r,{className:`my-3`}),(0,i.jsxs)(`div`,{className:`flex items-center justify-between text-xs`,children:[(0,i.jsx)(`span`,{className:`text-muted-foreground`,children:`Ultimo update`}),(0,i.jsx)(`span`,{className:`font-medium text-foreground`,children:`2 ore fa`})]})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-80 space-y-3">
      <p className="text-sm font-medium text-foreground">Sezione superiore</p>
      <Separator />
      <p className="text-sm text-muted-foreground">Sezione inferiore</p>
    </div>
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex h-8 items-center gap-3">
      <span className="text-sm text-foreground">Elemento A</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-foreground">Elemento B</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-foreground">Elemento C</span>
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: "In Content Block",
  render: () => <div className="w-72 rounded-xl border border-border p-4">
      <h4 className="text-sm font-semibold text-foreground">Titolo sezione</h4>
      <p className="mt-1 text-xs text-muted-foreground">
        Descrizione breve del contenuto
      </p>
      <Separator className="my-3" />
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Status</span>
        <span className="font-medium text-foreground">Attivo</span>
      </div>
      <Separator className="my-3" />
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Ultimo update</span>
        <span className="font-medium text-foreground">2 ore fa</span>
      </div>
    </div>
}`,...c.parameters?.docs?.source}}},l=[`Horizontal`,`Vertical`,`InContent`]}))();export{o as Horizontal,c as InContent,s as Vertical,l as __namedExportsOrder,a as default};