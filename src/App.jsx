import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, off } from "firebase/database";

// ── FIREBASE ──
const firebaseConfig = {
  apiKey: "AIzaSyAHbIzuXoJuRZFkEMknxYgM6zs1NjNR95k",
  authDomain: "decision-22ddf.firebaseapp.com",
  databaseURL: "https://decision-22ddf-default-rtdb.firebaseio.com",
  projectId: "decision-22ddf",
  storageBucket: "decision-22ddf.firebasestorage.app",
  messagingSenderId: "798208604439",
  appId: "1:798208604439:web:e1fc9c48faa6d9d288df52",
};
const fbApp = initializeApp(firebaseConfig);
const db = getDatabase(fbApp);

function codigoAleatorio() {
  return Math.random().toString(36).substring(2,8).toUpperCase();
}

// ── DATOS ──
const COLS = ['negro','rojo','verde','amarillo','celeste'];
const CNAME = {negro:'Negro',rojo:'Rojo',verde:'Verde',amarillo:'Amarillo',celeste:'Celeste'};
const CHX = {negro:'#222',rojo:'#e74c3c',verde:'#27ae60',amarillo:'#d4a800',celeste:'#2980b9'};

const EQ = [
  {id:1,c:[{d:['rojo'],p:['negro','negro']},{d:['celeste'],p:['amarillo','negro','verde']},{d:['amarillo','celeste'],p:['verde','rojo']},{d:['rojo'],p:['amarillo','verde','verde','negro']},{d:['negro','verde'],p:['amarillo','amarillo','rojo','celeste']}]},
  {id:2,c:[{d:['negro'],p:['rojo','amarillo']},{d:['rojo'],p:['celeste','verde','negro']},{d:['celeste','celeste'],p:['verde','negro']},{d:['amarillo'],p:['negro','rojo','verde','verde']},{d:['negro','celeste'],p:['rojo','rojo','amarillo','amarillo']}]},
  {id:3,c:[{d:['celeste'],p:['verde','verde']},{d:['negro'],p:['verde','rojo','amarillo']},{d:['rojo'],p:['amarillo','celeste','negro']},{d:['rojo','verde'],p:['celeste','celeste','amarillo']},{d:['negro','negro','verde'],p:['celeste','amarillo','rojo']}]},
  {id:4,c:[{d:['amarillo'],p:['negro','verde']},{d:['rojo','rojo'],p:['celeste','amarillo']},{d:['verde','amarillo'],p:['rojo','celeste']},{d:['celeste'],p:['negro','negro','verde','amarillo']},{d:['verde','verde'],p:['negro','amarillo','rojo','celeste']}]},
  {id:5,c:[{d:['rojo'],p:['verde','celeste']},{d:['celeste'],p:['rojo','verde','amarillo']},{d:['amarillo'],p:['negro','negro','rojo']},{d:['verde'],p:['negro','rojo','amarillo','celeste']},{d:['negro','rojo'],p:['amarillo','amarillo','celeste','verde']}]},
  {id:6,c:[{d:['negro'],p:['rojo','rojo']},{d:['celeste'],p:['amarillo','amarillo','verde']},{d:['verde','verde'],p:['negro','negro']},{d:['rojo'],p:['celeste','celeste','amarillo','amarillo']},{d:['celeste','celeste'],p:['rojo','rojo','negro','verde']}]},
  {id:7,c:[{d:['amarillo'],p:['celeste','rojo']},{d:['celeste'],p:['negro','negro','verde']},{d:['amarillo','negro'],p:['celeste','verde']},{d:['amarillo','amarillo'],p:['celeste','rojo','verde']},{d:['rojo','rojo','negro'],p:['verde','amarillo','celeste']}]},
  {id:8,c:[{d:['celeste'],p:['negro','amarillo']},{d:['negro','negro'],p:['verde','rojo']},{d:['rojo','amarillo'],p:['celeste','celeste']},{d:['verde','negro'],p:['rojo','rojo','celeste']},{d:['amarillo','amarillo','celeste'],p:['verde','verde','negro']}]},
  {id:9,c:[{d:['verde'],p:['amarillo','negro']},{d:['verde'],p:['celeste','rojo','rojo']},{d:['negro'],p:['celeste','amarillo','rojo']},{d:['verde','celeste'],p:['negro','rojo','amarillo']},{d:['negro','negro'],p:['celeste','amarillo','verde','verde']}]},
  {id:10,c:[{d:['verde'],p:['celeste','rojo']},{d:['amarillo'],p:['negro','celeste','rojo']},{d:['amarillo','negro'],p:['rojo','verde']},{d:['verde','rojo'],p:['amarillo','negro','celeste']},{d:['amarillo','rojo','negro'],p:['verde','verde','celeste']}]},
];

const TARJETAS = [
  {id:1,f:['rojo','celeste','celeste','negro','negro'],com:false},
  {id:2,f:['amarillo','amarillo','rojo','rojo','negro'],com:false},
  {id:3,f:['rojo','amarillo','amarillo','negro','negro'],com:false},
  {id:4,f:['amarillo','amarillo','amarillo','verde','verde'],com:false},
  {id:5,f:['negro','celeste','celeste','verde','verde'],com:false},
  {id:6,f:['celeste','celeste','celeste','verde','verde'],com:false},
  {id:7,f:['amarillo','amarillo','amarillo','negro','negro'],com:false},
  {id:8,f:['negro','celeste','celeste','verde','verde'],com:false},
  {id:9,f:['negro','negro','negro','rojo','rojo'],com:false},
  {id:10,f:['celeste','celeste','celeste','celeste','celeste'],com:true},
  {id:11,f:['amarillo','negro','negro','celeste','celeste'],com:false},
  {id:12,f:['celeste','celeste','celeste','celeste','negro'],com:true},
  {id:13,f:['celeste','verde','verde','verde','verde'],com:true},
  {id:14,f:['rojo','rojo','rojo','rojo','rojo'],com:true},
  {id:15,f:['celeste','celeste','celeste','celeste','celeste'],com:true},
  {id:16,f:['celeste','amarillo','amarillo','amarillo','amarillo'],com:true},
  {id:17,f:['amarillo','rojo','verde','celeste','negro'],com:false},
  {id:18,f:['verde','rojo','rojo','celeste','celeste'],com:false},
  {id:19,f:['rojo','rojo','amarillo','amarillo','verde'],com:false},
  {id:20,f:['celeste','celeste','verde','verde','rojo'],com:false},
  {id:21,f:['celeste','negro','amarillo','rojo','verde'],com:false},
  {id:22,f:['negro','negro','negro','celeste','celeste'],com:false},
  {id:23,f:['negro','amarillo','amarillo','verde','verde'],com:false},
  {id:24,f:['amarillo','amarillo','amarillo','negro','negro'],com:false},
  {id:25,f:['amarillo','amarillo','celeste','celeste','negro'],com:false},
  {id:26,f:['verde','verde','verde','rojo','rojo'],com:false},
  {id:27,f:['negro','rojo','rojo','amarillo','amarillo'],com:false},
  {id:28,f:['amarillo','amarillo','rojo','rojo','rojo'],com:false},
  {id:29,f:['amarillo','amarillo','amarillo','amarillo','amarillo'],com:true},
  {id:30,f:['negro','negro','verde','verde','verde'],com:false},
  {id:31,f:['verde','negro','negro','negro','negro'],com:true},
  {id:32,f:['rojo','amarillo','amarillo','negro','negro'],com:false},
  {id:33,f:['verde','verde','verde','verde','verde'],com:true},
  {id:34,f:['amarillo','negro','negro','rojo','rojo'],com:false},
  {id:35,f:['verde','verde','verde','verde','verde'],com:true},
  {id:36,f:['negro','negro','negro','rojo','rojo'],com:false},
  {id:37,f:['negro','negro','negro','negro','amarillo'],com:true},
  {id:38,f:['verde','verde','verde','verde','celeste'],com:true},
  {id:39,f:['amarillo','rojo','verde','verde','negro'],com:true},
  {id:40,f:['amarillo','amarillo','celeste','celeste','verde'],com:false},
  {id:41,f:['rojo','rojo','rojo','celeste','celeste'],com:false},
  {id:42,f:['celeste','celeste','celeste','amarillo','amarillo'],com:false},
  {id:43,f:['negro','celeste','verde','rojo','amarillo'],com:false},
  {id:44,f:['celeste','verde','verde','amarillo','amarillo'],com:false},
  {id:45,f:['celeste','rojo','rojo','verde','verde'],com:false},
  {id:46,f:['verde','rojo','amarillo','negro','celeste'],com:false},
  {id:47,f:['negro','rojo','rojo','rojo','rojo'],com:false},
  {id:48,f:['rojo','celeste','celeste','celeste','celeste'],com:false},
  {id:49,f:['negro','negro','rojo','negro','negro'],com:false},
  {id:50,f:['rojo','rojo','negro','rojo','rojo'],com:false},
  {id:51,f:['negro','negro','negro','negro','negro'],com:true},
  {id:52,f:['rojo','rojo','rojo','rojo','rojo'],com:true},
  {id:53,f:['amarillo','amarillo','amarillo','amarillo','amarillo'],com:true},
  {id:54,f:['negro','negro','negro','negro','negro'],com:true},
];

const MODOS = {
  corta:    {label:'Corta',    desc:'4 × 3  — 12 tarjetas', nCom:4,  nNorm:8},
  media:    {label:'Media',    desc:'4 × 6  — 24 tarjetas', nCom:8,  nNorm:16},
  larga:    {label:'Larga',    desc:'4 × 9  — 36 tarjetas', nCom:11, nNorm:25},
  completa: {label:'Completa', desc:'4 × 13/14 — 54 tarjetas', nCom:17, nNorm:37},
};
const IDS_COM  = [10,12,13,14,15,16,29,31,33,35,37,38,39,51,52,53,54];
const IDS_NORM = [1,2,3,4,5,6,7,8,9,11,17,18,19,20,21,22,23,24,25,26,27,28,30,32,34,36,40,41,42,43,44,45,46,47,48,49,50];

function tarjetasParaModo(modo){
  const m=MODOS[modo];
  const ids=[...IDS_COM.slice(0,m.nCom),...IDS_NORM.slice(0,m.nNorm)];
  return TARJETAS.filter(t=>ids.includes(t.id));
}

// ── LÓGICA ──
function shuf(a){const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;}
function tiene(fi,req){const cp=[...fi];for(const c of req){const x=cp.indexOf(c);if(x<0)return false;cp.splice(x,1);}return true;}
function aplica(fi,de,por){let cp=[...fi];for(const c of de){const x=cp.indexOf(c);cp.splice(x,1);}return [...cp,...por];}
function getCanjes(ea,fi){const r=[];ea.forEach(eq=>eq.c.forEach(c=>{if(tiene(fi,c.d))r.push({eqId:eq.id,de:c.d,por:c.p});if([...c.d].sort().join()!==[...c.p].sort().join()&&tiene(fi,c.p))r.push({eqId:eq.id,de:c.p,por:c.d});}));return r;}
function getObjetivos(mons,fi){const r=[];const v=new Set();mons.forEach(m=>{if(!m.length)return;const top=m[m.length-1];if(v.has(top.id))return;v.add(top.id);if(tiene(fi,top.f))r.push({t:top,sob:fi.length-top.f.length});});return r;}
function calcPts(com,sob,fase2){if(!fase2)return com?(sob===0?8:sob===1?5:sob===2?3:2):(sob===0?5:sob===1?3:sob===2?2:1);return com?(sob===0?12:sob===1?8:sob===2?5:3):(sob===0?8:sob===1?5:sob===2?3:2);}
function esPuntoMuerto(ea,fi,canjes){if(canjes.length!==1)return false;const res=aplica(fi,canjes[0].de,canjes[0].por);const sig=getCanjes(ea,res);if(sig.length!==1)return false;return[...aplica(res,sig[0].de,sig[0].por)].sort().join()===[...fi].sort().join();}

// Firebase convierte arrays en objetos — esta función los restaura
function normalizarG(g){
  if(!g)return g;
  const n={...g};
  // f: [[],[]] puede venir como {"0":[],"1":[]}
  if(n.f&&!Array.isArray(n.f)) n.f=Object.values(n.f);
  if(Array.isArray(n.f)){
    n.f=n.f.map(fi=>Array.isArray(fi)?fi:Object.values(fi||{}));
  }
  // mons: array de arrays
  if(n.mons&&!Array.isArray(n.mons)) n.mons=Object.values(n.mons);
  if(Array.isArray(n.mons)){
    n.mons=n.mons.map(m=>{
      if(!Array.isArray(m)) m=Object.values(m||{});
      return m.map(t=>({
        ...t,
        f:Array.isArray(t.f)?t.f:Object.values(t.f||{}),
      }));
    });
  }
  // pts y proxAccion y turnosPerdidos
  if(n.pts&&!Array.isArray(n.pts)) n.pts=Object.values(n.pts);
  if(n.proxAccion&&!Array.isArray(n.proxAccion)) n.proxAccion=Object.values(n.proxAccion);
  if(n.turnosPerdidos&&!Array.isArray(n.turnosPerdidos)) n.turnosPerdidos=Object.values(n.turnosPerdidos);
  // eqIds
  if(n.eqIds&&!Array.isArray(n.eqIds)) n.eqIds=Object.values(n.eqIds);
  // log
  if(n.log&&!Array.isArray(n.log)) n.log=Object.values(n.log||{});
  if(Array.isArray(n.log)){
    n.log=n.log.map(e=>{
      if(typeof e!=='object'||!e)return e;
      const ne={...e};
      if(ne.de&&!Array.isArray(ne.de)) ne.de=Object.values(ne.de);
      if(ne.por&&!Array.isArray(ne.por)) ne.por=Object.values(ne.por);
      return ne;
    });
  }
  return n;
}

function nuevoG(j1,j2,eqIds,modo='completa'){
  const pool=shuf(tarjetasParaModo(modo));
  const n=pool.length,pila=Math.floor(n/4),extra=n%4;
  const mons=[];let idx=0;
  for(let i=0;i<4;i++){const sz=pila+(i<extra?1:0);mons.push(pool.slice(idx,idx+sz));idx+=sz;}
  return {
    j1,j2,
    eqIds,   // solo los IDs, no los objetos completos
    modo,
    mons,
    turno:0,f:[[],[]],pts:[0,0],fase:1,monVacios:0,
    estado:'elegir_j1',proxAccion:[null,null],turnosPerdidos:[0,0],
    log:[],fin:false
  };
}

// ── COMPONENTES VISUALES ──
const Dot=({color,size=14})=><div style={{width:size,height:size,borderRadius:'50%',background:CHX[color],flexShrink:0,border:'1px solid rgba(0,0,0,0.2)'}}/>;
const FRow=({arr,size=11})=><div style={{display:'flex',gap:2,alignItems:'center',flexWrap:'wrap'}}>{arr.map((c,i)=><Dot key={i} color={c} size={size}/>)}</div>;
const TObj=({t,grande})=>{const sz=grande?14:12;return(<div style={{display:'inline-flex',alignItems:'center',gap:5,background:t.com?'#888':'#fafafa',border:`1.5px solid ${t.com?'#666':'#ddd'}`,borderRadius:7,padding:'4px 8px',flexShrink:0}}><FRow arr={t.f} size={sz}/>{t.com&&<span style={{fontSize:11,color:'#fff',fontWeight:700}}>★</span>}</div>);};

function AutoPass({onMount,msg}){
  useEffect(()=>{
    const t=setTimeout(onMount,600);
    return()=>clearTimeout(t);
  },[]);
  return msg?<div style={{fontSize:12,color:'#e67e22',padding:'8px 0',fontStyle:'italic'}}>{msg}</div>:null;
}

// ── PANTALLA: LOBBY ONLINE ──
function Lobby({onJoin,onBack}){
  const [modo,setModo]=useState('crear');
  const [nombre,setNombre]=useState('');
  const [codigo,setCodigo]=useState('');
  const [error,setError]=useState('');
  const [cargando,setCargando]=useState(false);

  const crearSala=async()=>{
    if(!nombre.trim()){setError('Ingresá tu nombre');return;}
    setCargando(true);
    const cod=codigoAleatorio();
    await set(ref(db,`salas/${cod}`),{
      j1:nombre.trim(),j2:null,
      estado:'esperando',
      creado:Date.now(),
    });
    onJoin(cod,nombre.trim(),0); // 0 = jugador 1
  };

  const unirse=async()=>{
    if(!nombre.trim()){setError('Ingresá tu nombre');return;}
    if(!codigo.trim()){setError('Ingresá el código');return;}
    setCargando(true);
    const cod=codigo.trim().toUpperCase();
    // Verificar que la sala exista y esté esperando
    const salaRef=ref(db,`salas/${cod}`);
    onValue(salaRef,(snap)=>{
      off(salaRef);
      const sala=snap.val();
      if(!sala){setError('Sala no encontrada');setCargando(false);return;}
      if(sala.estado!=='esperando'){setError('La sala ya está en juego');setCargando(false);return;}
      // Unirse como J2
      set(ref(db,`salas/${cod}/j2`),nombre.trim());
      set(ref(db,`salas/${cod}/estado`),'listo');
      onJoin(cod,nombre.trim(),1); // 1 = jugador 2
    },{onlyOnce:true});
  };

  const s={
    inp:{width:'100%',padding:'10px 12px',border:'1.5px solid #d4cfc9',borderRadius:8,fontSize:15,fontFamily:'inherit',boxSizing:'border-box',background:'white',marginBottom:10},
    btn:(pri)=>({display:'block',width:'100%',padding:12,background:pri?'#c0392b':'white',border:`1.5px solid ${pri?'#c0392b':'#d4cfc9'}`,borderRadius:8,color:pri?'white':'#1c1c1c',fontWeight:700,fontSize:14,cursor:'pointer',marginBottom:8}),
  };

  return(
    <div style={{minHeight:'100vh',background:'#f0ede8',fontFamily:'system-ui,sans-serif',display:'flex',flexDirection:'column'}}>
      <div style={{background:'#1a1a2e',padding:'12px 16px'}}>
        <div style={{fontWeight:800,fontSize:22,color:'#e94560',letterSpacing:4}}>DECISIÓN</div>
        <div style={{fontSize:9,color:'#8892a4',letterSpacing:3,marginTop:2}}>ONLINE</div>
      </div>
      <div style={{flex:1,padding:16,display:'flex',flexDirection:'column',gap:12}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {['crear','unirse'].map(m=>(
            <div key={m} onClick={()=>setModo(m)} style={{background:modo===m?'#fff5f5':'white',border:`2px solid ${modo===m?'#c0392b':'#d4cfc9'}`,borderRadius:9,padding:'12px',cursor:'pointer',textAlign:'center'}}>
              <div style={{fontSize:20,marginBottom:4}}>{m==='crear'?'🆕':'🔗'}</div>
              <div style={{fontWeight:700,fontSize:13,color:modo===m?'#c0392b':'#1c1c1c'}}>{m==='crear'?'Crear sala':'Unirse'}</div>
            </div>
          ))}
        </div>

        <div style={{background:'white',border:'1.5px solid #d4cfc9',borderRadius:10,padding:14}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:'uppercase',color:'#7a7570',marginBottom:4}}>Tu nombre</div>
          <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Cómo te llamas" maxLength={14} style={s.inp}/>

          {modo==='unirse'&&(
            <>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:'uppercase',color:'#7a7570',marginBottom:4}}>Código de sala</div>
              <input value={codigo} onChange={e=>setCodigo(e.target.value.toUpperCase())} placeholder="Ej: XK4P2M" maxLength={6} style={{...s.inp,textTransform:'uppercase',letterSpacing:4,fontSize:18,fontWeight:700,textAlign:'center'}}/>
            </>
          )}

          {error&&<div style={{color:'#c0392b',fontSize:12,marginBottom:8}}>{error}</div>}

          <button onClick={modo==='crear'?crearSala:unirse} style={s.btn(true)} disabled={cargando}>
            {cargando?'Conectando...':(modo==='crear'?'Crear sala →':'Unirse →')}
          </button>
          <button onClick={onBack} style={s.btn(false)}>← Volver</button>
        </div>
      </div>
    </div>
  );
}

// ── SALA DE ESPERA ──
function Espera({codigo,miNombre,miRol,eqIds,modo,onBack}){
  const [sala,setSala]=useState(null);
  const [gameState,setGameState]=useState(null);
  const [eqIdsLocal,setEqIdsLocal]=useState(eqIds||null);
  const [modoLocal,setModoLocal]=useState(modo||null);

  useEffect(()=>{
    const salaRef=ref(db,`salas/${codigo}`);
    onValue(salaRef,(snap)=>{
      const s=snap.val();
      if(!s)return;
      setSala(s);
      if(s.eqIds) setEqIdsLocal(s.eqIds);
      if(s.modo)  setModoLocal(s.modo);
      if(s.estado==='jugando'&&s.gameState){
        const g=s.gameState._json?JSON.parse(s.gameState._json):normalizarG(s.gameState);
        setGameState(g);
      }
    });
    return()=>off(ref(db,`salas/${codigo}`));
  },[codigo]);

  const iniciarPartida=()=>{
    if(!sala?.j2||!eqIdsLocal)return;
    const g=nuevoG(sala.j1,sala.j2,eqIdsLocal,modoLocal||'completa');
    set(ref(db,`salas/${codigo}/gameState`),{_json:JSON.stringify(g)});
    set(ref(db,`salas/${codigo}/estado`),'jugando');
  };

  // Cuando Firebase confirma que está jugando, mostrar el juego
  if(gameState&&sala){
    return(
      <Game
        j1={sala.j1} j2={sala.j2}
        eqIds={eqIdsLocal||[]} modo={modoLocal||'completa'}
        miRol={miRol} salaId={codigo} estadoInicial={gameState}
        onBack={onBack}/>
    );
  }

  return(
    <div style={{minHeight:'100vh',background:'#f0ede8',fontFamily:'system-ui,sans-serif',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{background:'white',border:'1.5px solid #d4cfc9',borderRadius:14,padding:24,width:'100%',maxWidth:340,textAlign:'center'}}>
        <div style={{fontWeight:800,fontSize:28,color:'#c0392b',letterSpacing:4,marginBottom:4}}>SALA</div>
        <div style={{fontSize:32,fontWeight:800,letterSpacing:6,color:'#1a1a2e',marginBottom:16,background:'#f0ede8',borderRadius:8,padding:'10px 0'}}>{codigo}</div>
        <div style={{fontSize:12,color:'#7a7570',marginBottom:16}}>Compartí este código con tu oponente</div>

        <div style={{marginBottom:16}}>
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 12px',background:'#f0f7ff',border:'1.5px solid #2980b9',borderRadius:8,marginBottom:6}}>
            <span style={{fontSize:16}}>👤</span>
            <span style={{fontWeight:600}}>{sala?.j1||'...'}</span>
            <span style={{fontSize:10,color:'#2980b9',marginLeft:'auto'}}>J1</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 12px',background:sala?.j2?'#f0f7ff':'#f8f8f8',border:`1.5px solid ${sala?.j2?'#2980b9':'#d4cfc9'}`,borderRadius:8}}>
            <span style={{fontSize:16}}>{sala?.j2?'👤':'⏳'}</span>
            <span style={{fontWeight:600,color:sala?.j2?'#1c1c1c':'#aaa'}}>{sala?.j2||'Esperando...'}</span>
            {sala?.j2&&<span style={{fontSize:10,color:'#2980b9',marginLeft:'auto'}}>J2</span>}
          </div>
        </div>

        {miRol===0&&sala?.j2&&(
          <button onClick={iniciarPartida}
            style={{display:'block',width:'100%',padding:12,background:'#c0392b',border:'none',borderRadius:8,color:'white',fontWeight:700,fontSize:15,cursor:'pointer',marginBottom:8}}>
            ¡JUGAR! →
          </button>
        )}
        {miRol===0&&!sala?.j2&&(
          <div style={{fontSize:12,color:'#7a7570',fontStyle:'italic',marginBottom:8}}>Esperando que se una el J2...</div>
        )}
        {miRol===1&&(
          <div style={{fontSize:12,color:'#7a7570',fontStyle:'italic',marginBottom:8}}>Esperando que J1 inicie el juego...</div>
        )}
        <button onClick={onBack} style={{display:'block',width:'100%',padding:9,background:'white',border:'1.5px solid #d4cfc9',borderRadius:8,color:'#7a7570',fontSize:12,cursor:'pointer'}}>
          ← Volver
        </button>
      </div>
    </div>
  );
}

// ── SETUP ──
function Setup({online,onStart,onBack}){
  const [j1,setJ1]=useState('Jugador 1');
  const [j2,setJ2]=useState('Jugador 2');
  const [sel,setSel]=useState([]);
  const [modo,setModo]=useState('completa');
  const tog=id=>setSel(p=>p.includes(id)?p.filter(x=>x!==id):p.length>=2?p:[...p,id]);
  const ok=sel.length===2;
  const inp={width:'100%',padding:'9px 10px',border:'1.5px solid #d4cfc9',borderRadius:7,fontSize:15,fontFamily:'inherit',boxSizing:'border-box',background:'white'};

  return(
    <div style={{minHeight:'100vh',background:'#f0ede8',fontFamily:'system-ui,sans-serif',display:'flex',flexDirection:'column'}}>
      <div style={{background:'#1a1a2e',padding:'12px 16px'}}>
        <div style={{fontWeight:800,fontSize:22,color:'#e94560',letterSpacing:4}}>DECISIÓN</div>
        <div style={{fontSize:9,color:'#8892a4',letterSpacing:3,marginTop:2}}>{online?'ONLINE':'LOCAL — DOS JUGADORES'}</div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:14}}>
        <div style={{background:'white',border:'1.5px solid #d4cfc9',borderRadius:10,padding:14,marginBottom:14}}>
          {!online&&(
            <>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:'uppercase',color:'#7a7570',marginBottom:4}}>Jugador 1</div>
              <input value={j1} onChange={e=>setJ1(e.target.value)} maxLength={14} style={{...inp,marginBottom:12}}/>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:'uppercase',color:'#7a7570',marginBottom:4}}>Jugador 2</div>
              <input value={j2} onChange={e=>setJ2(e.target.value)} maxLength={14} style={{...inp,marginBottom:14}}/>
            </>
          )}
          <div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:'uppercase',color:'#7a7570',marginBottom:6}}>Duración</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:14}}>
            {Object.entries(MODOS).map(([key,m])=>(
              <div key={key} onClick={()=>setModo(key)} style={{background:modo===key?'#fff5f5':'white',border:`2px solid ${modo===key?'#c0392b':'#d4cfc9'}`,borderRadius:8,padding:'8px 10px',cursor:'pointer'}}>
                <div style={{fontWeight:700,fontSize:13,color:modo===key?'#c0392b':'#1c1c1c'}}>{m.label}</div>
                <div style={{fontSize:10,color:'#999',marginTop:2}}>{m.desc}</div>
              </div>
            ))}
          </div>
          <button onClick={()=>ok&&onStart(j1,j2,sel,modo)}
            style={{display:'block',width:'100%',padding:12,background:ok?'#c0392b':'#bbb',border:'none',borderRadius:8,color:'white',fontWeight:700,fontSize:15,cursor:ok?'pointer':'default'}}>
            {online?'CONTINUAR →':'JUGAR →'}
          </button>
          {!ok&&<div style={{textAlign:'center',fontSize:11,color:'#c0392b',marginTop:6}}>Elegí 2 tarjetas ↓</div>}
          <button onClick={onBack} style={{display:'block',width:'100%',padding:9,background:'white',border:'1.5px solid #d4cfc9',borderRadius:8,color:'#7a7570',fontSize:12,cursor:'pointer',marginTop:8}}>
            ← Volver
          </button>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:'uppercase',color:'#7a7570'}}>Equivalencias — elegí 2</div>
          <button onClick={()=>setSel(shuf([1,2,3,4,5,6,7,8,9,10]).slice(0,2))}
            style={{padding:'5px 12px',background:'white',border:'1.5px solid #d4cfc9',borderRadius:6,fontSize:12,cursor:'pointer',color:'#555'}}>🎲 Azar</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {EQ.map(eq=>(
            <div key={eq.id} onClick={()=>tog(eq.id)} style={{background:sel.includes(eq.id)?'#fff5f5':'white',border:`2px solid ${sel.includes(eq.id)?'#c0392b':'#d4cfc9'}`,borderRadius:9,padding:'10px',cursor:'pointer',position:'relative'}}>
              {sel.includes(eq.id)&&<div style={{position:'absolute',top:-7,right:-7,background:'#c0392b',color:'white',fontSize:10,fontWeight:700,width:18,height:18,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>{sel.indexOf(eq.id)+1}</div>}
              <div style={{fontWeight:800,fontSize:14,color:sel.includes(eq.id)?'#c0392b':'#1c1c1c',marginBottom:6,paddingBottom:5,borderBottom:'1px solid #eee'}}>T. {eq.id}</div>
              {eq.c.map((c,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:5,marginBottom:5}}>
                  <FRow arr={c.d} size={13}/>
                  <span style={{fontSize:10,color:'#bbb',flexShrink:0}}>⇌</span>
                  <FRow arr={c.p} size={13}/>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── JUEGO ──
function Game({j1,j2,eqIds,modo,miRol,salaId,estadoInicial,onBack}){
  const online=!!salaId;
  const [G,setGLocal]=useState(()=>normalizarG(estadoInicial)||nuevoG(j1,j2,eqIds,modo));
  const [modalCanje,setModalCanje]=useState(false);
  const [canjesDisp,setCanjesDisp]=useState([]);
  const ignorarRef=useRef(false);

  // Normalizar G.f siempre antes de renderizar
  const gf = Array.isArray(G.f) ? G.f : Object.values(G.f||{'0':[],'1':[]});
  const gf0 = Array.isArray(gf[0]) ? gf[0] : Object.values(gf[0]||{});
  const gf1 = Array.isArray(gf[1]) ? gf[1] : Object.values(gf[1]||{});
  const gfSafe = [gf0, gf1];

  const gmons = Array.isArray(G.mons) ? G.mons.map(m=>Array.isArray(m)?m:Object.values(m||{})) : Object.values(G.mons||{}).map(m=>Array.isArray(m)?m:Object.values(m||{}));
  const glog = Array.isArray(G.log) ? G.log : Object.values(G.log||{});

  const ea = EQ.filter(e=>(G.eqIds||eqIds||[]).includes(e.id));

  // Online: sincronizar con Firebase
  useEffect(()=>{
    if(!online)return;
    const gameRef=ref(db,`salas/${salaId}/gameState`);
    onValue(gameRef,(snap)=>{
      if(ignorarRef.current)return;
      const val=snap.val();
      if(!val)return;
      // Deserializar desde string JSON
      const g=val._json?JSON.parse(val._json):normalizarG(val);
      setGLocal(g);
    });
    return()=>off(ref(db,`salas/${salaId}/gameState`));
  },[salaId,online]);

  const setG=(fn)=>{
    setGLocal(prev=>{
      const n=normalizarG(JSON.parse(JSON.stringify(prev)));
      fn(n);
      if(online){
        ignorarRef.current=true;
        // Guardar como string para que Firebase no convierta arrays en objetos
        set(ref(db,`salas/${salaId}/gameState`),{_json:JSON.stringify(n)}).then(()=>{
          setTimeout(()=>{ignorarRef.current=false;},500);
        });
      }
      return n;
    });
  };

  const upd=fn=>setG(fn);
  const nom=i=>i===0?G.j1:G.j2;
  const t=G.turno;

  // En online, solo el jugador activo puede jugar
  const esMiTurno = !online || miRol===G.turno ||
    (G.estado==='sacar' && miRol!==(G.turno)) ; // quien saca es el oponente

  const canjesAhora=(G.estado==='canje'||G.estado==='post_canje')?getCanjes(ea,gfSafe[t]):[];
  const objAhora=G.estado==='post_canje'?getObjetivos(gmons,gfSafe[t]):[];

  const elegirFicha=color=>{
    if(online&&miRol!==G.turno)return;
    upd(n=>{
      n.f[n.turno].push(color);
      n.log.push({tipo:'ficha',jugador:n.turno,color});
      if(n.f[n.turno].length>10){n.estado='sacar';return;}
      if(n.estado==='elegir_j1'){n.turno=1;n.estado='elegir_j2';}
      else if(n.estado==='elegir_j2'){n.turno=0;n.estado='canje';}
      else if(n.estado==='elegir'){
        const otro=1-n.turno;n.turno=otro;
        if(n.turnosPerdidos[otro]>0){
          n.turnosPerdidos[otro]--;
          n.log.push({tipo:'info',txt:`⚠ ${nom(otro)} pierde su turno`});
          n.turno=1-otro;n.estado=n.proxAccion[1-otro]||'canje';n.proxAccion[1-otro]=null;
        } else {n.estado=n.proxAccion[otro]||'canje';n.proxAccion[otro]=null;}
      }
    });
  };

  const hacerCanje=canje=>{
    if(online&&miRol!==G.turno)return;
    setModalCanje(false);
    upd(n=>{
      const ji=n.turno;
      n.f[ji]=aplica(n.f[ji],canje.de,canje.por);
      n.log.push({tipo:'canje',jugador:ji,de:canje.de,por:canje.por,eqId:canje.eqId});
      if(n.f[ji].length>10){n.estado='sacar';return;}
      n.estado='post_canje';
    });
  };

  const avanzarTurno=(n)=>{
    const ji=n.turno,fi=n.f[ji],otro=1-ji;
    const eaLocal=EQ.filter(e=>(n.eqIds||eqIds||[]).includes(e.id));
    if(fi.length===0){n.proxAccion[ji]='elegir';}
    else{
      const cjSig=getCanjes(eaLocal,fi);
      if(cjSig.length===0){
        n.log.push({tipo:'info',txt:`⚠ ${nom(ji)} sin canjes — pierde un turno`});
        n.turnosPerdidos[ji]=1;n.proxAccion[ji]='elegir';
      } else if(esPuntoMuerto(eaLocal,fi,cjSig)){
        n.log.push({tipo:'info',txt:`⚠ ${nom(ji)} en punto muerto — canje obligado`});
        n.proxAccion[ji]='elegir';
      } else {n.proxAccion[ji]=null;}
    }
    if(n.turnosPerdidos[otro]>0){
      n.turnosPerdidos[otro]--;
      n.log.push({tipo:'info',txt:`⚠ ${nom(otro)} pierde su turno`});
      n.estado=n.proxAccion[ji]||'canje';n.proxAccion[ji]=null;
    } else {
      n.turno=otro;n.estado=n.proxAccion[otro]||'canje';n.proxAccion[otro]=null;
    }
  };

  const terminarTurno=()=>{
    if(online&&miRol!==G.turno)return;
    upd(n=>avanzarTurno(n));
  };

  const tomarObj=obj=>{
    if(online&&miRol!==G.turno)return;
    upd(n=>{
      const ji=n.turno,sob=n.f[ji].length-obj.t.f.length;
      const pts=calcPts(obj.t.com,sob,n.fase===2);
      n.pts[ji]+=pts;n.f[ji]=aplica(n.f[ji],obj.t.f,[]);
      n.log.push({tipo:'punto',jugador:ji,pts,sob,com:obj.t.com});
      const mi=n.mons.findIndex(m=>m.length>0&&m[m.length-1].id===obj.t.id);
      if(mi>=0){
        n.mons[mi].pop();
        if(n.mons[mi].length===0){
          n.monVacios++;
          if(n.monVacios===1&&n.fase===1){n.fase=2;n.log.push({tipo:'info',txt:'📈 ¡Fase 2! Los puntos aumentan'});}
          if(n.monVacios>=2){n.fin=true;return;}
        }
      }
      avanzarTurno(n);
    });
  };

  const sacarFicha=idx=>{
    // En online, quien saca es el OPONENTE del que tiene exceso
    if(online&&miRol===G.turno)return; // el que tiene exceso no puede sacarse a sí mismo
    upd(n=>{
      const opp=1-n.turno;
      n.f[n.turno].splice(idx,1);
      n.log.push({tipo:'info',txt:`${nom(opp)} le saca una ficha a ${nom(n.turno)}`});
      if(n.f[n.turno].length<=10)n.estado='post_canje';
    });
  };

  const card={background:'white',border:'1.5px solid #d4cfc9',borderRadius:10,padding:12,marginBottom:8};
  const btn=(tp='')=>({display:'block',width:'100%',padding:'10px 12px',marginBottom:6,background:tp==='pri'?'#c0392b':tp==='gold'?'#fff8ee':'white',border:`1.5px solid ${tp==='pri'?'#c0392b':tp==='gold'?'#e67e22':'#d4cfc9'}`,borderRadius:8,color:tp==='pri'?'white':'#1c1c1c',fontFamily:'inherit',fontSize:13,fontWeight:tp==='pri'?700:500,cursor:'pointer',textAlign:'left',lineHeight:1.4});

  const descTurno=()=>{
    if(G.fin)return null;
    const n=nom(t);
    const esYo=!online||miRol===t;
    const pre=esYo?'':n+': ';
    if(G.estado==='elegir_j1')return(online&&miRol!==0)?`Esperando que ${nom(0)} elija ficha...`:`${nom(0)}: elegí tu ficha inicial`;
    if(G.estado==='elegir_j2')return(online&&miRol!==1)?`Esperando que ${nom(1)} elija ficha...`:`${nom(1)}: elegí tu ficha inicial`;
    if(G.estado==='elegir')return esYo?'Elegí una ficha':`Esperando a ${n}...`;
    if(G.estado==='canje')return esYo?'Hacé un canje':`Esperando a ${n}...`;
    if(G.estado==='post_canje')return esYo?(objAhora.length>0?'Podés tomar una tarjeta, o pasá':'Pasá el turno'):`Esperando a ${n}...`;
    if(G.estado==='sacar'){
      const opp=1-t;
      return(!online||miRol===opp)?`Elegí qué ficha sacarle a ${nom(t)}`:`${nom(opp)} elige qué ficha sacarte...`;
    }
    return '';
  };

  const bloqueado=online&&(
    (G.estado==='sacar'&&miRol===G.turno) ||
    (G.estado!=='sacar'&&miRol!==G.turno)
  );

  // Detectar PC vs móvil
  const isPC = window.innerWidth >= 900;

  // ── SUBCOMPONENTES COMPARTIDOS ──
  const PanelEquivalencias = ({eqSize=13}) => (
    <div style={{background:'white',borderRadius:10,padding:'10px 12px',border:'1.5px solid #e8e3de',marginBottom:isPC?0:8}}>
      <div style={{fontSize:8,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:'#aaa',marginBottom:8}}>Equivalencias</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        {ea.map(eq=>(
          <div key={eq.id} style={{background:'#fff5f5',border:'1.5px solid #e8b4b0',borderRadius:9,padding:'8px 10px'}}>
            <div style={{fontWeight:800,fontSize:13,color:'#c0392b',marginBottom:6,paddingBottom:4,borderBottom:'1.5px solid #fdd'}}>T. {eq.id}</div>
            {eq.c.map((c,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:5,marginBottom:5}}>
                <FRow arr={c.d} size={eqSize}/>
                <span style={{fontSize:10,color:'#ccc',flexShrink:0}}>⇌</span>
                <FRow arr={c.p} size={eqSize}/>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const PanelPilas = () => (
    <div style={{background:'white',borderRadius:10,padding:'10px 12px',border:'1.5px solid #e8e3de',marginBottom:isPC?0:8}}>
      <div style={{fontSize:8,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:'#aaa',marginBottom:8}}>Tarjetas objetivo</div>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        {gmons.map((m,i)=>(
          <div key={i} style={{
            background:'#f8f8f8',
            border:`1.5px solid ${m.length===0?'#e8e3de':m.length<=3?'#e74c3c':'#ccc'}`,
            borderRadius:9,padding:'7px 9px',
            opacity:m.length===0?0.4:1,
            textAlign:'center',flexShrink:0,
          }}>
            {m.length>0?(
              <>
                <TObj t={m[m.length-1]}/>
                <div style={{marginTop:5,fontWeight:800,fontSize:16,color:m.length<=3?'#e74c3c':'#444',lineHeight:1}}>{m.length}</div>
              </>
            ):(
              <div style={{fontSize:10,color:'#bbb',padding:'4px 6px'}}>Vacía</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const PanelHistorial = ({maxItems=14}) => (
    <div style={{background:'white',borderRadius:10,padding:'10px 12px',border:'1.5px solid #e8e3de',flex:1,overflow:'hidden'}}>
      <div style={{fontSize:8,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:'#aaa',marginBottom:6}}>Historial</div>
      {(!glog||glog.length===0)
        ?<div style={{fontSize:11,color:'#bbb',fontStyle:'italic'}}>Sin movimientos aún.</div>
        :glog.slice(-maxItems).reverse().map((e,i)=>{
          const row={padding:'4px 0',borderBottom:'1px solid #f0ede8',display:'flex',alignItems:'center',gap:4,flexWrap:'wrap'};
          if(typeof e==='string')return<div key={i} style={{...row,fontSize:11,color:'#555'}}>{e}</div>;
          if(e.tipo==='info')return<div key={i} style={{...row,fontSize:10,color:'#e67e22'}}>{e.txt}</div>;
          if(e.tipo==='punto')return(<div key={i} style={row}><span style={{fontSize:11,fontWeight:700,color:'#27ae60'}}>{nom(e.jugador)}</span><span style={{fontSize:11,color:'#27ae60'}}>+{e.pts}pts{e.com?' ★':''}</span><span style={{fontSize:10,color:'#aaa'}}>({e.sob} sob.)</span></div>);
          if(e.tipo==='ficha')return(<div key={i} style={row}><span style={{fontSize:11,fontWeight:600,color:'#555'}}>{nom(e.jugador)}</span><span style={{fontSize:10,color:'#aaa'}}>elige</span><Dot color={e.color} size={13}/></div>);
          if(e.tipo==='canje')return(<div key={i} style={row}><span style={{fontSize:11,fontWeight:600,color:'#555'}}>{nom(e.jugador)}</span><FRow arr={e.de} size={13}/><span style={{color:'#888',fontWeight:700,fontSize:12}}>→</span><FRow arr={e.por} size={13}/><span style={{fontSize:9,color:'#bbb'}}>(T.{e.eqId})</span></div>);
          return null;
        })}
    </div>
  );

  const PanelFichasJugadores = ({dotSize=24}) => (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
      {[0,1].map(ji=>(
        <div key={ji} style={{
          background:G.turno===ji&&!G.fin?'#fff8f7':'white',
          border:`2px solid ${G.turno===ji&&!G.fin?'#c0392b':'#d4cfc9'}`,
          borderRadius:10,padding:'10px 12px'
        }}>
          <div style={{fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:1,
            color:G.turno===ji&&!G.fin?'#c0392b':'#7a7570',marginBottom:6}}>
            {nom(ji)}{online&&miRol===ji?' · vos':''} · {gfSafe[ji].length}
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:5,minHeight:26,alignItems:'center'}}>
            {gfSafe[ji].length===0
              ?<span style={{fontSize:10,color:'#bbb',fontStyle:'italic'}}>Sin fichas</span>
              :gfSafe[ji].map((c,k)=><Dot key={k} color={c} size={dotSize}/>)}
          </div>
        </div>
      ))}
    </div>
  );

  const PanelAcciones = () => (
    <div style={{background:'white',borderRadius:10,padding:'12px',border:'1.5px solid #e8e3de'}}>
      {G.estado==='sacar'&&(
        <div>
          <div style={{fontSize:12,color:'#c0392b',marginBottom:8,fontWeight:600}}>
            {nom(t)} tiene {gfSafe[t].length} fichas. Elegí cuál sacarle:
          </div>
          {gfSafe[t].map((c,i)=>(
            <button key={i} onClick={()=>sacarFicha(i)} style={{...btn(),display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
              <Dot color={c} size={18}/> Sacar {CNAME[c]}
            </button>
          ))}
        </div>
      )}
      {(G.estado==='elegir_j1'||G.estado==='elegir_j2'||G.estado==='elegir')&&(
        <div>
          <div style={{fontSize:11,color:'#7a7570',marginBottom:8}}>Elegí una ficha:</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
            {COLS.map(col=>(
              <button key={col} onClick={()=>elegirFicha(col)} style={{...btn(),display:'flex',alignItems:'center',gap:8}}>
                <Dot color={col} size={18}/> {CNAME[col]}
              </button>
            ))}
          </div>
        </div>
      )}
      {G.estado==='canje'&&(
        canjesAhora.length>0
          ?<button style={btn('pri')} onClick={()=>{setCanjesDisp(canjesAhora);setModalCanje(true);}}>
            ⇄ {nom(t)}: hacer un canje ({canjesAhora.length} opción{canjesAhora.length>1?'es':''})
          </button>
          :<AutoPass onMount={terminarTurno} msg={`Sin canjes posibles — turno automático`}/>
      )}
      {G.estado==='post_canje'&&(
        objAhora.length>0?(
          <>
            <div style={{fontSize:11,color:'#27ae60',fontWeight:700,marginBottom:8}}>¡Podés tomar una tarjeta objetivo!</div>
            {objAhora.map((obj,i)=>{
              const pts=calcPts(obj.t.com,obj.sob,G.fase===2);
              return(
                <button key={i} onClick={()=>tomarObj(obj)} style={{...btn(obj.t.com?'gold':'pri'),marginBottom:6}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                    <TObj t={obj.t} grande/>
                    <span style={{color:obj.t.com?'#e67e22':'#fff',fontWeight:700,fontSize:14}}>{pts} pts</span>
                    <span style={{fontSize:11,color:obj.t.com?'#888':'rgba(255,255,255,0.7)'}}>{obj.sob} sob.</span>
                  </div>
                </button>
              );
            })}
            <button style={btn()} onClick={terminarTurno}>No tomar — pasar turno</button>
          </>
        ):(
          <AutoPass onMount={terminarTurno} msg=""/>
        )
      )}
    </div>
  );

  const TurnoBox = () => descTurno()?(
    <div style={{
      background:bloqueado?'#2a2a3a':'#1a1a2e',
      borderRadius:8,padding:'9px 14px',
      borderLeft:`4px solid ${bloqueado?'#555':'#c0392b'}`
    }}>
      <div style={{color:bloqueado?'#8892a4':'white',fontSize:13,fontWeight:500}}>{descTurno()}</div>
    </div>
  ):null;

  const FinPartida = () => G.fin?(
    <div style={{background:'white',border:'2px solid #c0392b',borderRadius:12,padding:20,textAlign:'center'}}>
      <div style={{fontWeight:800,fontSize:28,color:'#c0392b',letterSpacing:3,marginBottom:4}}>¡FIN!</div>
      <div style={{fontSize:14,fontWeight:700,color:'#e67e22',marginBottom:14}}>
        {G.pts[0]===G.pts[1]?'¡Empate!':`Ganó ${G.pts[0]>G.pts[1]?G.j1:G.j2}`}
      </div>
      <div style={{display:'flex',gap:28,justifyContent:'center',marginBottom:16}}>
        {[0,1].map(ji=>(<div key={ji}><div style={{fontSize:9,color:'#aaa',textTransform:'uppercase',letterSpacing:1,marginBottom:2}}>{nom(ji)}</div><div style={{fontWeight:800,fontSize:32,color:G.pts[ji]>=G.pts[1-ji]?'#e67e22':'#aaa'}}>{G.pts[ji]}</div></div>))}
      </div>
      <button onClick={onBack} style={{display:'block',width:'100%',padding:11,background:'#c0392b',border:'none',borderRadius:8,color:'white',fontWeight:700,fontSize:14,cursor:'pointer'}}>
        NUEVA PARTIDA
      </button>
    </div>
  ):null;

  // ── MODAL CANJE (igual en ambos layouts) ──
  const ModalCanje = () => modalCanje?(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:200,display:'flex',alignItems:isPC?'center':'flex-end',justifyContent:'center'}} onClick={()=>setModalCanje(false)}>
      <div style={{background:'white',borderRadius:isPC?'12px':'16px 16px 0 0',padding:20,width:'100%',maxWidth:520,maxHeight:'85vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
        <div style={{fontWeight:800,fontSize:15,color:'#c0392b',marginBottom:12}}>ELEGIR CANJE — {nom(t)}</div>
        <div style={{background:'#f8f8f8',border:'1.5px solid #e0dbd6',borderRadius:8,padding:'10px 12px',marginBottom:10}}>
          <div style={{fontSize:8,fontWeight:700,letterSpacing:1,textTransform:'uppercase',color:'#7a7570',marginBottom:6}}>Tus fichas</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>{gfSafe[t].map((c,k)=><Dot key={k} color={c} size={28}/>)}</div>
        </div>
        <div style={{background:'#f8f8f8',border:'1.5px solid #e0dbd6',borderRadius:8,padding:'10px 12px',marginBottom:14}}>
          <div style={{fontSize:8,fontWeight:700,letterSpacing:1,textTransform:'uppercase',color:'#7a7570',marginBottom:6}}>Tarjetas objetivo</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {gmons.filter(m=>m.length>0).map((m,i)=>(
              <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
                <TObj t={m[m.length-1]} grande/>
                <span style={{fontSize:9,fontWeight:700,color:m.length<=3?'#c0392b':'#999'}}>{m.length}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontSize:11,color:'#7a7570',marginBottom:10,fontStyle:'italic'}}>Elegí el canje:</div>
        {canjesDisp.map((c,i)=>(
          <button key={i} onClick={()=>hacerCanje(c)} style={{display:'block',width:'100%',padding:'12px 14px',marginBottom:7,background:'#f8f8f8',border:'1.5px solid #e0dbd6',borderRadius:9,fontFamily:'inherit',fontSize:13,cursor:'pointer',textAlign:'left'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
              <FRow arr={c.de} size={20}/>
              <span style={{fontWeight:700,color:'#555',fontSize:18}}>→</span>
              <FRow arr={c.por} size={20}/>
              <span style={{fontSize:10,color:'#aaa'}}>(T.{c.eqId})</span>
            </div>
          </button>
        ))}
        <button onClick={()=>setModalCanje(false)} style={{display:'block',width:'100%',padding:9,background:'#f0ede8',border:'1px solid #d4cfc9',borderRadius:7,color:'#888',fontSize:12,cursor:'pointer',marginTop:4}}>
          Cancelar
        </button>
      </div>
    </div>
  ):null;

  // ── HEADER (compartido) ──
  const Header = () => (
    <div style={{background:'#1a1a2e',padding:'8px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:10,flexShrink:0}}>
      <span style={{fontWeight:800,fontSize:16,color:'#e94560',letterSpacing:3}}>DECISIÓN</span>
      <div style={{display:'flex',gap:20,alignItems:'center'}}>
        {[0,1].map(ji=>(
          <div key={ji} style={{textAlign:'center'}}>
            <div style={{fontSize:8,letterSpacing:1,textTransform:'uppercase',color:G.turno===ji?'#f5a623':'#8892a4'}}>
              {nom(ji)}{online&&miRol===ji?' ★':''}
            </div>
            <div style={{fontWeight:800,fontSize:22,color:G.turno===ji?'#f5a623':'#eaeaea',lineHeight:1}}>{G.pts[ji]}</div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',gap:6,alignItems:'center'}}>
        {G.fase===2&&<span style={{fontSize:9,background:'#e67e22',color:'white',padding:'2px 6px',borderRadius:4}}>FASE 2</span>}
        {online&&salaId&&<span style={{fontSize:9,color:'#888',letterSpacing:1,background:'rgba(255,255,255,0.07)',padding:'2px 7px',borderRadius:4}}>{salaId}</span>}
        <button onClick={onBack} style={{padding:'4px 10px',background:'transparent',border:'1px solid rgba(255,255,255,0.15)',borderRadius:5,color:'#8892a4',fontSize:10,cursor:'pointer'}}>Menú</button>
      </div>
    </div>
  );

  // ════════════════════════════════════
  //   LAYOUT PC — Opción D
  // ════════════════════════════════════
  if(isPC) return(
    <div style={{height:'100vh',background:'#f0ede8',fontFamily:'system-ui,sans-serif',display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <Header/>
      <div style={{flex:1,display:'grid',gridTemplateColumns:'310px 1fr',overflow:'hidden'}}>

        {/* Columna izquierda: eq + pilas + historial */}
        <div style={{background:'white',borderRight:'1.5px solid #d4cfc9',padding:'12px',display:'flex',flexDirection:'column',gap:10,overflowY:'auto'}}>
          <PanelEquivalencias eqSize={20}/>
          <PanelPilas/>
          <PanelHistorial maxItems={20}/>
        </div>

        {/* Columna derecha: fichas grandes + turno + acciones */}
        <div style={{padding:'14px 16px',display:'flex',flexDirection:'column',gap:10,overflowY:'auto'}}>
          <TurnoBox/>
          <PanelFichasJugadores dotSize={40}/>
          {!G.fin&&!bloqueado&&<PanelAcciones/>}
          {G.fin&&<FinPartida/>}
        </div>
      </div>
      <ModalCanje/>
    </div>
  );

  // ════════════════════════════════════
  //   LAYOUT MÓVIL — actual
  // ════════════════════════════════════
  return(
    <div style={{minHeight:'100vh',background:'#f0ede8',fontFamily:'system-ui,sans-serif',display:'flex',flexDirection:'column'}}>
      <Header/>
      <div style={{flex:1,overflowY:'auto',padding:'10px 12px'}}>
        <PanelEquivalencias eqSize={13}/>
        <div style={{marginBottom:8}}><PanelPilas/></div>
        <PanelFichasJugadores dotSize={24}/>
        <div style={{marginBottom:8}}/>
        <TurnoBox/>
        <div style={{marginBottom:8}}/>
        {!G.fin&&!bloqueado&&<><PanelAcciones/><div style={{marginBottom:8}}/></>}
        <PanelHistorial maxItems={14}/>
        {G.fin&&<><div style={{marginBottom:8}/><FinPartida/></>}
      </div>
      <ModalCanje/>
    </div>
  );
}

// ── APP PRINCIPAL ──
export default function App(){
  const [pant,setPant]=useState('menu');
  const [data,setData]=useState(null);

  // Local
  if(pant==='setup-local') return(
    <Setup online={false}
      onStart={(j1,j2,sel,modo)=>{setData({j1,j2,sel,modo});setPant('game-local');}}
      onBack={()=>setPant('menu')}/>
  );
  if(pant==='game-local'&&data) return(
    <Game j1={data.j1} j2={data.j2} eqIds={data.sel} modo={data.modo}
      miRol={-1} salaId={null} estadoInicial={null}
      onBack={()=>setPant('menu')}/>
  );

  // Online
  if(pant==='lobby') return(
    <Lobby
      onJoin={(cod,nombre,rol)=>{
        setData({codigo:cod,miNombre:nombre,miRol:rol,sel:null,modo:null,j1:null,j2:null,gs:null});
        // J1 configura equivalencias, J2 va directo a esperar
        if(rol===0) setPant('setup-online');
        else setPant('espera');
      }}
      onBack={()=>setPant('menu')}/>
  );
  if(pant==='setup-online') return(
    <Setup online={true}
      onStart={(j1,j2,sel,modo)=>{
        // Guardar en Firebase para que J2 los tenga
        set(ref(db,`salas/${data.codigo}/eqIds`),sel);
        set(ref(db,`salas/${data.codigo}/modo`),modo);
        setData(d=>({...d,sel,modo}));
        setPant('espera');
      }}
      onBack={()=>setPant('lobby')}/>
  );
  if(pant==='espera'&&data) return(
    <Espera
      codigo={data.codigo} miNombre={data.miNombre} miRol={data.miRol}
      eqIds={data.sel} modo={data.modo}
      onBack={()=>setPant('menu')}/>
  );
  // game-online ya no se usa — Espera navega directamente al Game

  // Menú principal
  return(
    <div style={{height:'100vh',background:'radial-gradient(ellipse at 50% 40%,#16213e,#0d0d1a)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',fontFamily:'system-ui,sans-serif',padding:24}}>
      <div style={{fontWeight:800,fontSize:44,letterSpacing:8,color:'#e94560',lineHeight:1,textAlign:'center'}}>DECISIÓN</div>
      <div style={{fontSize:9,letterSpacing:4,color:'#8892a4',textTransform:'uppercase',marginBottom:28,marginTop:6,textAlign:'center'}}>Un juego de Yetem</div>
      <div style={{display:'flex',justifyContent:'center',gap:14,marginBottom:32}}>
        {['#222','#e74c3c','#27ae60','#d4a800','#2980b9'].map((c,i)=>(
          <div key={i} style={{width:22,height:22,borderRadius:'50%',background:c,boxShadow:`0 0 14px ${c}`}}/>
        ))}
      </div>
      <div style={{width:'100%',maxWidth:300,display:'flex',flexDirection:'column',gap:10}}>
        <button onClick={()=>setPant('setup-local')}
          style={{padding:'14px 20px',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:10,color:'#eaeaea',fontSize:15,fontWeight:600,cursor:'pointer',fontFamily:'inherit',textAlign:'center'}}>
          🎮 Local — mismo dispositivo
        </button>
        <button onClick={()=>setPant('lobby')}
          style={{padding:'14px 20px',background:'rgba(233,69,96,0.15)',border:'1px solid rgba(233,69,96,0.4)',borderRadius:10,color:'#e94560',fontSize:15,fontWeight:600,cursor:'pointer',fontFamily:'inherit',textAlign:'center'}}>
          🌐 Online — dispositivos distintos
        </button>
      </div>
    </div>
  );
}
