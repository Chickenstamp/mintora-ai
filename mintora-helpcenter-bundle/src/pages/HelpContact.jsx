import React, {{ useState }} from "react";

export default function HelpContact(){{
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  async function submit(e){{
    e.preventDefault();
    try{{
      await fetch("/api/support/contact", {{
        method:"POST",
        headers: {{"Content-Type":"application/json"}},
        body: JSON.stringify({{ email, message: msg }})
      }});
      setSent(true);
    }}catch(e){{ alert("Failed to send. Please email support@mintoralab.com"); }}
  }}

  if(sent) return <div style={{maxWidth:600, margin:"24px auto"}}>Thanks! We’ll reply by email.</div>;

  return (
    <div style={{maxWidth: 600, margin:"24px auto", fontFamily:"system-ui, sans-serif"}}>
      <h1>Contact Support</h1>
      <form onSubmit={{submit}}>
        <label>Email</label>
        <input value={{email}} onChange={{e=>setEmail(e.target.value)}} required style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #ddd"}} />
        <label style={{marginTop:10, display:"block"}}>How can we help?</label>
        <textarea value={{msg}} onChange={{e=>setMsg(e.target.value)}} required rows={{5}} style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #ddd"}}/>
        <button type="submit" style={{marginTop:12, padding:"10px 14px", borderRadius:8, border:"1px solid #ddd"}}>Send</button>
      </form>
      <p style={{opacity:.7, fontSize:12, marginTop:10}}>Or email us: support@mintoralab.com</p>
    </div>
  );
}}
