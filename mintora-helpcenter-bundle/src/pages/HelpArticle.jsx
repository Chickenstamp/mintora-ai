import React from "react";
import {{ useParams, Link }} from "react-router-dom";
import hcData from "../support/articles.json";

export default function HelpArticle(){{
  const {{ slug }} = useParams();
  const a = hcData.articles.find(x => x.slug === slug);
  if(!a) return <div style={{maxWidth:800, margin:"24px auto"}}>Article not found. <Link to="/help">Back</Link></div>;
  return (
    <div style={{maxWidth: 860, margin:"24px auto", fontFamily:"system-ui, sans-serif"}}>
      <Link to="/help">← Help Center</Link>
      <h1 style={{marginTop:8}}>{{a.title}}</h1>
      <div style={{opacity:.7, fontSize:13}}>{{a.category}}</div>
      <div dangerouslySetInnerHTML={{{{__html: a.body_html}}}} style={{marginTop:16, lineHeight:1.6}} />
    </div>
  );
}}
