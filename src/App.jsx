import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, off } from "firebase/database";

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

function codigoAleatorio(){return Math.random().toString(36).substring(2,8).toUpperCase();}

const COLS=['negro','rojo','verde','amarillo','celeste'];
const CNAME={negro:'Negro',rojo:'Rojo',verde:'Verde',amarillo:'Amarillo',celeste:'Celeste'};
const CHX={negro:'#222',rojo:'#e74c3c',verde:'#27ae60',amarillo:'#d4a800',celeste:'#2980b9'};

const EQ=[
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

const TARJETAS=[
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

const MODOS={
  corta:   {label:'Corta',   desc:'4 × 3  — 12 tarjetas',     nCom:4,  nNorm:8},
  media:   {label:'Media',   desc:'4 × 6  — 24 tarjetas',     nCom:8,  nNorm:16},
  larga:   {label:'Larga',   desc:'4 × 9  — 36 tarjetas',     nCom:11, nNorm:25},
  completa:{label:'Completa',desc:'4 × 13/14 — 54 tarjetas',  nCom:17, nNorm:37},
};
const IDS_COM =[10,12,13,14,15,16,29,31,33,35,37,38,39,51,52,53,54];
const IDS_NORM=[1,2,3,4,5,6,7,8,9,11,17,18,19,20,21,22,23,24,25,26,27,28,30,32,34,36,40,41,42,43,44,45,46,47,48,49,50];

function tarjetasParaModo(modo){
  const m=MODOS[modo]||MODOS.completa;
  const ids=[...IDS_COM.slice(0,m.nCom),...IDS_NORM.slice(0,m.nNorm)];
  return TARJETAS.filter(t=>ids.includes(t.id));
}

// ── HELPERS ──
function shuf(a){const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;}
function toArr(x){return Array.isArray(x)?x:Object.values(x||{});}
function toStr(x){return toArr(x).map(String);}  // array de strings
function toNum(x){return toArr(x).map(Number);}   // array de numeros

function tiene(fi,req){const cp=[...fi];for(const c of req){const x=cp.indexOf(c);if(x<0)return false;cp.splice(x,1);}return true;}
function aplica(fi,de,por){let cp=[...fi];for(const c of de){const x=cp.indexOf(c);cp.splice(x,1);}return [...cp,...por];}

function getCanjes(ea,fi){
  const r=[];
  ea.forEach(eq=>eq.c.forEach(c=>{
    if(tiene(fi,c.d))r.push({eqId:eq.id,de:c.d,por:c.p});
    if([...c.d].sort().join()!==[...c.p].sort().join()&&tiene(fi,c.p))r.push({eqId:eq.id,de:c.p,por:c.d});
  }));
  return r;
}
function getObjetivos(mons,fi){
  const r=[];const v=new Set();
  mons.forEach(m=>{
    if(!m.length)return;
    const top=m[m.length-1];
    if(v.has(top.id))return;v.add(top.id);
    if(tiene(fi,top.f))r.push({t:top,sob:fi.length-top.f.length});
  });
  return r;
}
function calcPts(com,sob,fase2){
  if(!fase2)return com?(sob===0?8:sob===1?5:sob===2?3:2):(sob===0?5:sob===1?3:sob===2?2:1);
  return com?(sob===0?12:sob===1?8:sob===2?5:3):(sob===0?8:sob===1?5:sob===2?3:2);
}
function esPuntoMuerto(ea,fi,canjes){
  if(canjes.length!==1)return false;
  const res=aplica(fi,canjes[0].de,canjes[0].por);
  const sig=getCanjes(ea,res);
  if(sig.length!==1)return false;
  return[...aplica(res,sig[0].de,sig[0].por)].sort().join()===[...fi].sort().join();
}

// ── NORMALIZAR ESTADO QUE VIENE DE FIREBASE ──
// Firebase convierte arrays en objetos {"0":x,"1":y,...}
// Esta función lo revierte de forma exhaustiva
function normalizarG(g){
  if(!g||typeof g!=='object')return null;
  try{
    // Trabajamos sobre una copia
    const n={...g};

    // Arrays simples de strings (fichas)
    n.f=toArr(n.f).map(fi=>toStr(fi));

    // mons: array de pilas, cada pila es array de tarjetas
    n.mons=toArr(n.mons).map(m=>
      toArr(m).map(t=>({...t, f:toStr(t.f), com:!!t.com, id:Number(t.id)}))
    );

    // Arrays numéricos
    n.pts=toNum(n.pts);
    n.eqIds=toNum(n.eqIds);

    // saltear (nuevo) — compatible con turnosPerdidos (viejo)
    if(n.turnosPerdidos!==undefined){
      n.saltear=toNum(n.turnosPerdidos);
      delete n.turnosPerdidos;
    } else {
      n.saltear=toNum(n.saltear||[0,0]);
    }
    if(!n.saltear||n.saltear.length<2)n.saltear=[0,0];

    // proxEstado (nuevo) — compatible con proxAccion (viejo)
    if(n.proxAccion!==undefined){
      n.proxEstado=toArr(n.proxAccion).map(x=>x===undefined?null:x);
      delete n.proxAccion;
    } else {
      n.proxEstado=toArr(n.proxEstado||[null,null]).map(x=>x===undefined?null:x);
    }
    if(!n.proxEstado||n.proxEstado.length<2)n.proxEstado=[null,null];

    // inicFichas: cuántos jugadores eligieron ficha al inicio
    if(n.inicFichas===undefined)n.inicFichas=2; // partida vieja: ya arrancó

    // log: array de objetos
    n.log=toArr(n.log).map(e=>{
      if(!e||typeof e!=='object')return e;
      const ne={...e};
      if(ne.de)ne.de=toStr(ne.de);
      if(ne.por)ne.por=toStr(ne.por);
      return ne;
    });

    // Escalares
    n.turno=Number(n.turno)||0;
    n.fase=Number(n.fase)||1;
    n.monVacios=Number(n.monVacios)||0;
    n.fin=!!n.fin;

    return n;
  }catch(e){
    console.error('normalizarG error:',e);
    return null;
  }
}

function nuevoG(j1,j2,eqIds,modo='completa',empieza='azar'){
  const pool=shuf(tarjetasParaModo(modo));
  const n=pool.length,pila=Math.floor(n/4),extra=n%4;
  const mons=[];let idx=0;
  for(let i=0;i<4;i++){const sz=pila+(i<extra?1:0);mons.push(pool.slice(idx,idx+sz));idx+=sz;}
  // quién empieza
  let primero=0;
  if(empieza==='azar') primero=Math.random()<0.5?0:1;
  else if(empieza==='j2') primero=1;
  return{
    j1,j2,eqIds:eqIds.map(Number),modo,mons,
    // turno: índice del jugador activo
    turno:primero,
    // estado:
    // 'elegir_ini'  → el jugador activo elige su ficha inicial (inicio de partida)
    // 'esperar_ini' → el otro jugador ya eligió, este todavía no (solo el otro ve esto)
    // 'canje'       → debe hacer un canje
    // 'post_canje'  → puede tomar tarjeta o pasar
    // 'sacar'       → el oponente le saca una ficha (exceso)
    estado:'elegir_ini',
    // fase de inicio: cuántos jugadores ya eligieron ficha
    inicFichas:0,
    // saltear[i]: cuántos turnos debe saltear el jugador i
    saltear:[0,0],
    // proxEstado[i]: qué estado tendrá el jugador i cuando le toque (null = 'canje' normal)
    proxEstado:[null,null],
    f:[[],[]],pts:[0,0],fase:1,monVacios:0,
    log:[],fin:false
  };
}

// ── SERIALIZAR/DESERIALIZAR PARA FIREBASE ──
// Guardamos el estado como string JSON para evitar que Firebase corrompa arrays
function serializarG(g){return{_json:JSON.stringify(g)};}
function deserializarG(raw){
  if(!raw)return null;
  if(raw._json){
    try{return JSON.parse(raw._json);}catch(e){return normalizarG(raw);}
  }
  return normalizarG(raw);
}

// ── COMPONENTES VISUALES ──
const Dot=({color,size=14})=>(
  <div style={{width:size,height:size,borderRadius:'50%',background:CHX[color],flexShrink:0,border:'1px solid rgba(0,0,0,0.2)'}}/>
);
const FRow=({arr,size=11})=>(
  <div style={{display:'flex',gap:2,alignItems:'center',flexWrap:'wrap'}}>
    {arr.map((c,i)=><Dot key={i} color={c} size={size}/>)}
  </div>
);
const TObj=({t,sz=12})=>(
  <div style={{display:'inline-flex',alignItems:'center',gap:3,flexWrap:'wrap',justifyContent:'center',
    background:t.com?'#4a4a4a':'#fafafa',
    border:`1.5px solid ${t.com?'#888':'#ddd'}`,
    borderRadius:7,padding:'4px 7px',flexShrink:0}}>
    <FRow arr={t.f} size={sz}/>
    {t.com&&<span style={{fontSize:sz*0.8,color:'#ccc',fontWeight:700}}>★</span>}
  </div>
);

function AutoPass({onMount,msg}){
  const ran=useRef(false);
  useEffect(()=>{
    if(ran.current)return;
    ran.current=true;
    const id=setTimeout(onMount,600);
    return()=>clearTimeout(id);
  },[]);
  return msg?<div style={{fontSize:12,color:'#e67e22',padding:'8px 0',fontStyle:'italic'}}>{msg}</div>:null;
}

// ── LOBBY ──
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
    await set(ref(db,`salas/${cod}`),{j1:nombre.trim(),j2:null,estado:'esperando',creado:Date.now()});
    onJoin(cod,nombre.trim(),0);
  };

  const unirse=async()=>{
    if(!nombre.trim()){setError('Ingresá tu nombre');return;}
    if(!codigo.trim()){setError('Ingresá el código');return;}
    setCargando(true);
    const cod=codigo.trim().toUpperCase();
    onValue(ref(db,`salas/${cod}`),(snap)=>{
      off(ref(db,`salas/${cod}`));
      const sala=snap.val();
      if(!sala){setError('Sala no encontrada');setCargando(false);return;}
      if(sala.estado!=='esperando'){setError('La sala ya está en juego');setCargando(false);return;}
      set(ref(db,`salas/${cod}/j2`),nombre.trim());
      set(ref(db,`salas/${cod}/estado`),'listo');
      onJoin(cod,nombre.trim(),1);
    },{onlyOnce:true});
  };

  const sinp={width:'100%',padding:'10px 12px',border:'1.5px solid #d4cfc9',borderRadius:8,fontSize:15,fontFamily:'inherit',boxSizing:'border-box',background:'white',marginBottom:10};
  const sbtn=(pri)=>({display:'block',width:'100%',padding:12,background:pri?'#c0392b':'white',border:`1.5px solid ${pri?'#c0392b':'#d4cfc9'}`,borderRadius:8,color:pri?'white':'#1c1c1c',fontWeight:700,fontSize:14,cursor:'pointer',marginBottom:8,fontFamily:'inherit'});

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
          <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Cómo te llamas" maxLength={14} style={sinp}/>
          {modo==='unirse'&&(
            <>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:'uppercase',color:'#7a7570',marginBottom:4}}>Código de sala</div>
              <input value={codigo} onChange={e=>setCodigo(e.target.value.toUpperCase())} placeholder="Ej: XK4P2M" maxLength={6} style={{...sinp,textTransform:'uppercase',letterSpacing:4,fontSize:18,fontWeight:700,textAlign:'center'}}/>
            </>
          )}
          {error&&<div style={{color:'#c0392b',fontSize:12,marginBottom:8}}>{error}</div>}
          <button onClick={modo==='crear'?crearSala:unirse} style={sbtn(true)} disabled={cargando}>
            {cargando?'Conectando...':(modo==='crear'?'Crear sala →':'Unirse →')}
          </button>
          <button onClick={onBack} style={sbtn(false)}>← Volver</button>
        </div>
      </div>
    </div>
  );
}

// ── SALA DE ESPERA ──
function Espera({codigo,miRol,onBack}){
  const [sala,setSala]=useState(null);
  const [listo,setListo]=useState(null); // {j1,j2,gameState,eqIds,modo}

  useEffect(()=>{
    const r=ref(db,`salas/${codigo}`);
    onValue(r,(snap)=>{
      const s=snap.val();
      if(!s)return;
      setSala(s);
      // Cuando J1 marca jugando y hay gameState, arrancar
      if(s.estado==='jugando'&&s.gameState){
        const gs=deserializarG(s.gameState);
        if(gs){
          const ids=(Array.isArray(s.eqIds)?s.eqIds:Object.values(s.eqIds||{})).map(Number);
          setListo({j1:s.j1,j2:s.j2,gameState:gs,eqIds:ids,modo:s.modo||'completa'});
        }
      }
    });
    return()=>off(ref(db,`salas/${codigo}`));
  },[codigo]);

  const iniciarPartida=()=>{
    if(!sala?.j2)return;
    const ids=(Array.isArray(sala.eqIds)?sala.eqIds:Object.values(sala.eqIds||{})).map(Number);
    if(!ids.length)return;
    const g=nuevoG(sala.j1,sala.j2,ids,sala.modo||'completa',sala.empieza||'azar');
    // Un solo set atómico con todo lo necesario
    set(ref(db,`salas/${codigo}`),{
      ...sala,
      gameState:serializarG(g),
      estado:'jugando',
    });
  };

  if(listo){
    return(
      <Game j1={listo.j1} j2={listo.j2} eqIds={listo.eqIds} modo={listo.modo}
        miRol={miRol} salaId={codigo} estadoInicial={listo.gameState}
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
            <span>👤</span><span style={{fontWeight:600}}>{sala?.j1||'...'}</span>
            <span style={{fontSize:10,color:'#2980b9',marginLeft:'auto'}}>J1</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 12px',background:sala?.j2?'#f0f7ff':'#f8f8f8',border:`1.5px solid ${sala?.j2?'#2980b9':'#d4cfc9'}`,borderRadius:8}}>
            <span>{sala?.j2?'👤':'⏳'}</span>
            <span style={{fontWeight:600,color:sala?.j2?'#1c1c1c':'#aaa'}}>{sala?.j2||'Esperando...'}</span>
            {sala?.j2&&<span style={{fontSize:10,color:'#2980b9',marginLeft:'auto'}}>J2</span>}
          </div>
        </div>
        {miRol===0&&sala?.j2&&(
          <button onClick={iniciarPartida} style={{display:'block',width:'100%',padding:12,background:'#c0392b',border:'none',borderRadius:8,color:'white',fontWeight:700,fontSize:15,cursor:'pointer',marginBottom:8}}>
            ¡JUGAR! →
          </button>
        )}
        {miRol===0&&!sala?.j2&&<div style={{fontSize:12,color:'#7a7570',fontStyle:'italic',marginBottom:8}}>Esperando que se una J2...</div>}
        {miRol===1&&<div style={{fontSize:12,color:'#7a7570',fontStyle:'italic',marginBottom:8}}>Esperando que J1 inicie...</div>}
        <button onClick={onBack} style={{display:'block',width:'100%',padding:9,background:'white',border:'1.5px solid #d4cfc9',borderRadius:8,color:'#7a7570',fontSize:12,cursor:'pointer',fontFamily:'inherit'}}>
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
  const [empieza,setEmpieza]=useState('azar');
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
          <div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:'uppercase',color:'#7a7570',marginBottom:6}}>¿Quién empieza?</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,marginBottom:14}}>
            {[['azar','🎲 Azar'],['j1','Jugador 1'],['j2','Jugador 2']].map(([key,lbl])=>(
              <div key={key} onClick={()=>setEmpieza(key)} style={{background:empieza===key?'#fff5f5':'white',border:`2px solid ${empieza===key?'#c0392b':'#d4cfc9'}`,borderRadius:8,padding:'8px 6px',cursor:'pointer',textAlign:'center'}}>
                <div style={{fontWeight:700,fontSize:12,color:empieza===key?'#c0392b':'#1c1c1c'}}>{lbl}</div>
              </div>
            ))}
          </div>
          <button onClick={()=>ok&&onStart(j1,j2,sel,modo,empieza)}
            style={{display:'block',width:'100%',padding:12,background:ok?'#c0392b':'#bbb',border:'none',borderRadius:8,color:'white',fontWeight:700,fontSize:15,cursor:ok?'pointer':'default'}}>
            {online?'CONTINUAR →':'JUGAR →'}
          </button>
          {!ok&&<div style={{textAlign:'center',fontSize:11,color:'#c0392b',marginTop:6}}>Elegí 2 tarjetas ↓</div>}
          <button onClick={onBack} style={{display:'block',width:'100%',padding:9,background:'white',border:'1.5px solid #d4cfc9',borderRadius:8,color:'#7a7570',fontSize:12,cursor:'pointer',marginTop:8,fontFamily:'inherit'}}>
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
function Game({j1,j2,eqIds,modo,empieza,miRol,salaId,estadoInicial,onBack}){
  const online=!!salaId;
  const [G,setGLocal]=useState(()=>estadoInicial?normalizarG(estadoInicial):nuevoG(j1,j2,eqIds,modo,empieza||'azar'));
  const [modalCanje,setModalCanje]=useState(false);
  const [canjesDisp,setCanjesDisp]=useState([]);
  const escribiendoRef=useRef(false);
  const isPC=window.innerWidth>=900;

  // Reconstruir ea siempre desde eqIds normalizados
  const eaIds=(Array.isArray(G.eqIds)?G.eqIds:Object.values(G.eqIds||{})).map(Number);
  const ea=EQ.filter(e=>eaIds.includes(e.id));

  // Normalizar arrays que pueden venir corruptos de Firebase
  const gf=[
    Array.isArray(G.f[0])?G.f[0]:Object.values(G.f[0]||{}),
    Array.isArray(G.f[1])?G.f[1]:Object.values(G.f[1]||{}),
  ];
  const gmons=(Array.isArray(G.mons)?G.mons:Object.values(G.mons||{})).map(m=>
    (Array.isArray(m)?m:Object.values(m||{})).map(t=>({...t,f:Array.isArray(t.f)?t.f:Object.values(t.f||{})}))
  );
  const glog=Array.isArray(G.log)?G.log:Object.values(G.log||{});

  // Sincronización Firebase
  useEffect(()=>{
    if(!online)return;
    const r=ref(db,`salas/${salaId}/gameState`);
    onValue(r,(snap)=>{
      if(escribiendoRef.current)return;
      const val=snap.val();
      if(!val)return;
      const g=deserializarG(val);
      if(g)setGLocal(normalizarG(g));
    });
    return()=>off(ref(db,`salas/${salaId}/gameState`));
  },[salaId,online]);

  const setG=fn=>{
    setGLocal(prev=>{
      const n=normalizarG(JSON.parse(JSON.stringify(prev)));
      fn(n);
      if(online){
        escribiendoRef.current=true;
        set(ref(db,`salas/${salaId}/gameState`),serializarG(n))
          .then(()=>setTimeout(()=>{escribiendoRef.current=false;},1000));
      }
      return n;
    });
  };

  const nom=i=>i===0?G.j1:G.j2;
  const t=G.turno;
  const upd=fn=>setG(fn);

  const eaDeN=n=>{
    const ids=(Array.isArray(n.eqIds)?n.eqIds:Object.values(n.eqIds||{})).map(Number);
    return EQ.filter(e=>ids.includes(e.id));
  };

  const canjesAhora=(G.estado==='canje'||G.estado==='post_canje')?getCanjes(ea,gf[t]):[];
  const objAhora=G.estado==='post_canje'?getObjetivos(gmons,gf[t]):[];

  // Bloqueo online: solo actúa quien tiene el turno
  // Excepción: en 'sacar', actúa el OPONENTE (1-turno)
  const bloqueado=online&&(
    G.estado==='sacar'?miRol===G.turno:miRol!==G.turno
  );

  // ── FUNCIÓN CENTRAL: calcular próximo estado y pasar turno ──
  const siguienteTurno=n=>{
    const ji=n.turno;
    const fi=n.f[ji];
    const otro=1-ji;
    const eaL=eaDeN(n);

    // Determinar qué le toca a ji la próxima vez que juegue
    if(fi.length===0){
      n.proxEstado[ji]='elegir';
    } else {
      const cjs=getCanjes(eaL,fi);
      if(cjs.length===0){
        n.log.push({tipo:'info',txt:`⚠ ${nom(ji)} sin canjes — pierde un turno`});
        n.saltear[ji]=1;
        n.proxEstado[ji]='elegir';
      } else if(esPuntoMuerto(eaL,fi,cjs)){
        n.log.push({tipo:'info',txt:`⚠ ${nom(ji)} en punto muerto — canje obligado`});
        n.proxEstado[ji]='elegir';
      } else {
        n.proxEstado[ji]=null;
      }
    }

    // Pasar al otro. Si el otro tiene salteos, consumir uno y quedarme en ji.
    if(n.saltear[otro]>0){
      n.saltear[otro]--;
      n.log.push({tipo:'info',txt:`⚠ ${nom(otro)} pierde su turno`});
      // ji juega de nuevo con su proxEstado
      n.estado=n.proxEstado[ji]||'canje';
      n.proxEstado[ji]=null;
      // n.turno sigue siendo ji
    } else {
      n.turno=otro;
      n.estado=n.proxEstado[otro]||'canje';
      n.proxEstado[otro]=null;
    }
  };

  const elegirFicha=color=>{
    if(online&&bloqueado)return;
    upd(n=>{
      const ji=n.turno;
      n.f[ji].push(color);
      n.log.push({tipo:'ficha',jugador:ji,color});
      if(n.f[ji].length>10){n.estado='sacar';return;}

      if(n.estado==='elegir_ini'){
        // Fase de inicio: registrar que este jugador eligió
        n.inicFichas=(n.inicFichas||0)+1;

        // Verificar si la ficha elegida tiene canjes
        const eaL=eaDeN(n);
        const cjs=getCanjes(eaL,n.f[ji]);
        if(cjs.length===0){
          n.log.push({tipo:'info',txt:`⚠ ${nom(ji)} sin canjes — pierde un turno`});
          n.saltear[ji]=1;
          n.proxEstado[ji]='elegir';
        }

        if(n.inicFichas<2){
          // El otro jugador también tiene que elegir su ficha
          n.turno=1-ji;
          n.estado='elegir_ini';
        } else {
          // Ambos eligieron. El primer canje lo hace el jugador original
          // (el que eligió primero, que es 1-ji porque ji fue el último)
          const primero=1-ji;
          // Si el primero tiene salteos, los consume y empieza el otro
          if(n.saltear[primero]>0){
            n.saltear[primero]--;
            n.log.push({tipo:'info',txt:`⚠ ${nom(primero)} pierde su turno`});
            n.turno=ji;
            n.estado=n.proxEstado[ji]||'canje';
            n.proxEstado[ji]=null;
          } else {
            n.turno=primero;
            n.estado=n.proxEstado[primero]||'canje';
            n.proxEstado[primero]=null;
          }
        }

      } else if(n.estado==='elegir'){
        // Mid-game: eligió su ficha, usar siguienteTurno para pasar
        siguienteTurno(n);
      }
    });
  };

  const hacerCanje=canje=>{
    if(online&&bloqueado)return;
    setModalCanje(false);
    upd(n=>{
      const ji=n.turno;
      n.f[ji]=aplica(n.f[ji],canje.de,canje.por);
      n.log.push({tipo:'canje',jugador:ji,de:canje.de,por:canje.por,eqId:canje.eqId});
      if(n.f[ji].length>10){n.estado='sacar';return;}
      n.estado='post_canje';
    });
  };

  const avanzarTurno=n=>siguienteTurno(n);

  const terminarTurno=()=>{
    if(online&&bloqueado)return;
    upd(n=>avanzarTurno(n));
  };

  const tomarObj=obj=>{
    if(online&&bloqueado)return;
    upd(n=>{
      const ji=n.turno,sob=n.f[ji].length-obj.t.f.length;
      const pts=calcPts(obj.t.com,sob,n.fase===2);
      n.pts[ji]+=pts;n.f[ji]=aplica(n.f[ji],obj.t.f,[]);
      n.log.push({tipo:'punto',jugador:ji,pts,sob,com:obj.t.com,tObj:obj.t});
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
    if(online&&bloqueado)return;
    upd(n=>{
      const opp=1-n.turno;
      n.f[n.turno].splice(idx,1);
      n.log.push({tipo:'info',txt:`${nom(opp)} le saca una ficha a ${nom(n.turno)}`});
      if(n.f[n.turno].length<=10)n.estado='post_canje';
    });
  };

  const descTurno=()=>{
    if(G.fin)return null;
    const esYo=!online||miRol===t;
    const n=nom(t);
    if(G.estado==='elegir_ini')return online&&miRol!==G.turno?`Esperando que ${nom(G.turno)} elija ficha...`:`${nom(G.turno)}: elegí tu ficha inicial`;
    if(G.estado==='elegir_j1')return online&&miRol!==0?`Esperando que ${nom(0)} elija ficha...`:`${nom(0)}: elegí tu ficha inicial`;
    if(G.estado==='elegir_j2')return online&&miRol!==1?`Esperando que ${nom(1)} elija ficha...`:`${nom(1)}: elegí tu ficha inicial`;
    if(G.estado==='elegir')return esYo?`${n}: elegí una ficha`:`Esperando a ${n}...`;
    if(G.estado==='canje')return esYo?`${n}: hacé un canje`:`Esperando a ${n}...`;
    if(G.estado==='post_canje')return esYo?(objAhora.length>0?`${n}: podés tomar una tarjeta, o pasá`:`${n}: pasá el turno`):`Esperando a ${n}...`;
    if(G.estado==='sacar'){
      const opp=1-t;
      return(!online||miRol===opp)?`${nom(opp)}: elegí qué ficha sacarle a ${n}`:`${nom(opp)} elige qué ficha sacarte...`;
    }
    return '';
  };

  // ── ESTILOS ──
  const btn=(tp='')=>({display:'block',width:'100%',padding:'10px 12px',marginBottom:6,
    background:tp==='pri'?'#c0392b':tp==='gold'?'#fff8ee':'white',
    border:`1.5px solid ${tp==='pri'?'#c0392b':tp==='gold'?'#e67e22':'#d4cfc9'}`,
    borderRadius:8,color:tp==='pri'?'white':'#1c1c1c',
    fontFamily:'inherit',fontSize:13,fontWeight:tp==='pri'?700:500,
    cursor:'pointer',textAlign:'left',lineHeight:1.4});

  // ── PANELES ──
  const Hdr=()=>(
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
        {online&&<span style={{fontSize:9,color:'#888',background:'rgba(255,255,255,0.07)',padding:'2px 7px',borderRadius:4}}>{salaId}</span>}
        <button onClick={onBack} style={{padding:'4px 10px',background:'transparent',border:'1px solid rgba(255,255,255,0.15)',borderRadius:5,color:'#8892a4',fontSize:10,cursor:'pointer'}}>Menú</button>
      </div>
    </div>
  );

  const PanelEq=({sz=13})=>(
    <div style={{background:'white',borderRadius:10,padding:'10px 12px',border:'1.5px solid #e8e3de'}}>
      <div style={{fontSize:8,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:'#aaa',marginBottom:8}}>Equivalencias</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        {ea.map(eq=>(
          <div key={eq.id} style={{background:'#fff5f5',border:'1.5px solid #e8b4b0',borderRadius:9,padding:'8px 10px'}}>
            <div style={{fontWeight:800,fontSize:13,color:'#c0392b',marginBottom:6,paddingBottom:4,borderBottom:'1.5px solid #fdd'}}>T. {eq.id}</div>
            {eq.c.map((c,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:5,marginBottom:sz>20?9:5}}>
                <FRow arr={c.d} size={sz}/>
                <span style={{fontSize:10,color:'#ccc',flexShrink:0}}>⇌</span>
                <FRow arr={c.p} size={sz}/>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const PanelPilas=({sz=12,grid=false})=>(
    <div style={{background:'white',borderRadius:10,padding:'10px 12px',border:'1.5px solid #e8e3de'}}>
      <div style={{fontSize:8,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:'#aaa',marginBottom:8}}>Tarjetas objetivo</div>
      <div style={grid?{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}:{display:'flex',gap:8,flexWrap:'wrap'}}>
        {gmons.map((m,i)=>(
          <div key={i} style={{background:'#f8f8f8',border:`1.5px solid ${m.length===0?'#e8e3de':m.length<=3?'#e74c3c':'#ccc'}`,borderRadius:9,padding:'8px 10px',opacity:m.length===0?0.4:1,textAlign:'center',flex:grid?undefined:'0 0 auto'}}>
            {m.length>0?(
              <>
                <TObj t={m[m.length-1]} sz={sz}/>
                <div style={{marginTop:5,fontWeight:800,fontSize:sz+4,color:m.length<=3?'#e74c3c':'#444',lineHeight:1}}>{m.length}</div>
              </>
            ):<div style={{fontSize:10,color:'#bbb',padding:'4px 0'}}>Vacía</div>}
          </div>
        ))}
      </div>
    </div>
  );

  const [verCanjeadas,setVerCanjeadas]=useState(false);

  const PanelHist=({max=14})=>{
    const canjeadas=glog.filter(e=>e&&e.tipo==='punto');
    return(
      <div style={{background:'white',borderRadius:10,padding:'10px 12px',border:'1.5px solid #e8e3de',flex:1,minHeight:0,overflowY:'auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
          <div style={{fontSize:8,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:'#aaa'}}>Historial</div>
          {canjeadas.length>0&&(
            <button onClick={()=>setVerCanjeadas(v=>!v)}
              style={{fontSize:9,background:'#f0ede8',border:'1px solid #d4cfc9',borderRadius:5,padding:'2px 7px',cursor:'pointer',color:'#555'}}>
              {verCanjeadas?'← Historial':`🏆 Tarjetas (${canjeadas.length})`}
            </button>
          )}
        </div>
        {verCanjeadas?(
          // Vista de tarjetas canjeadas
          <div>
            {[0,1].map(ji=>{
              const pts=G.pts[ji];
              const tarj=canjeadas.filter(e=>e.jugador===ji);
              return(
                <div key={ji} style={{marginBottom:10}}>
                  <div style={{fontSize:10,fontWeight:700,color:'#555',marginBottom:4,display:'flex',justifyContent:'space-between'}}>
                    <span>{nom(ji)}</span>
                    <span style={{color:'#e67e22',fontWeight:800}}>{pts} pts</span>
                  </div>
                  {tarj.length===0?<div style={{fontSize:10,color:'#bbb',fontStyle:'italic'}}>Sin tarjetas aún</div>:
                  tarj.map((e,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',gap:6,padding:'3px 0',borderBottom:'1px solid #f5f3f0'}}>
                      {e.tObj&&<TObj t={e.tObj} sz={11}/>}
                      <span style={{fontSize:11,color:'#27ae60',fontWeight:700}}>+{e.pts}pts{e.com?' ★':''}</span>
                      <span style={{fontSize:10,color:'#aaa'}}>{e.sob} sob.</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ):(
          // Vista de historial normal
          (!glog||glog.length===0)
            ?<div style={{fontSize:11,color:'#bbb',fontStyle:'italic'}}>Sin movimientos aún.</div>
            :glog.slice(-max).reverse().map((e,i)=>{
              const row={padding:'4px 0',borderBottom:'1px solid #f0ede8',display:'flex',alignItems:'center',gap:4,flexWrap:'wrap'};
              if(!e||typeof e==='string')return<div key={i} style={{...row,fontSize:11,color:'#555'}}>{e}</div>;
              if(e.tipo==='info')return<div key={i} style={{...row,fontSize:10,color:'#e67e22'}}>{e.txt}</div>;
              if(e.tipo==='punto')return(
                <div key={i} style={row}>
                  <span style={{fontSize:11,fontWeight:700,color:'#27ae60'}}>{nom(e.jugador)}</span>
                  {e.tObj&&<TObj t={e.tObj} sz={11}/>}
                  <span style={{fontSize:11,color:'#27ae60'}}>+{e.pts}pts{e.com?' ★':''}</span>
                  <span style={{fontSize:10,color:'#aaa'}}>({e.sob} sob.)</span>
                </div>
              );
              if(e.tipo==='ficha')return<div key={i} style={row}><span style={{fontSize:11,fontWeight:600,color:'#555'}}>{nom(e.jugador)}</span><span style={{fontSize:10,color:'#aaa'}}>elige</span><Dot color={e.color} size={13}/></div>;
              if(e.tipo==='canje')return<div key={i} style={row}><span style={{fontSize:11,fontWeight:600,color:'#555'}}>{nom(e.jugador)}</span><FRow arr={e.de} size={13}/><span style={{color:'#888',fontWeight:700,fontSize:12}}>→</span><FRow arr={e.por} size={13}/><span style={{fontSize:9,color:'#bbb'}}>(T.{e.eqId})</span></div>;
              return null;
            })
        )}
      </div>
    );
  };

  const PanelJugadores=({dotSz=24})=>(
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
      {[0,1].map(ji=>(
        <div key={ji} style={{background:G.turno===ji&&!G.fin?'#fff8f7':'white',border:`2px solid ${G.turno===ji&&!G.fin?'#c0392b':'#d4cfc9'}`,borderRadius:10,padding:'10px 12px'}}>
          <div style={{fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:1,color:G.turno===ji&&!G.fin?'#c0392b':'#7a7570',marginBottom:6}}>
            {nom(ji)}{online&&miRol===ji?' · vos':''} · {gf[ji].length}
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:5,minHeight:26,alignItems:'center'}}>
            {gf[ji].length===0?<span style={{fontSize:10,color:'#bbb',fontStyle:'italic'}}>Sin fichas</span>:gf[ji].map((c,k)=><Dot key={k} color={c} size={dotSz}/>)}
          </div>
        </div>
      ))}
    </div>
  );

  const TurnoBox=()=>descTurno()?(
    <div style={{background:bloqueado?'#2a2a3a':'#1a1a2e',borderRadius:8,padding:'9px 14px',borderLeft:`4px solid ${bloqueado?'#555':'#c0392b'}`}}>
      <div style={{color:bloqueado?'#8892a4':'white',fontSize:13,fontWeight:500}}>{descTurno()}</div>
    </div>
  ):null;

  const Acciones=()=>(
    <div style={{background:'white',borderRadius:10,padding:'12px',border:'1.5px solid #e8e3de'}}>
      {G.estado==='sacar'&&(
        <div>
          <div style={{fontSize:12,color:'#c0392b',marginBottom:8,fontWeight:600}}>{nom(t)} tiene {gf[t].length} fichas. Elegí cuál sacarle:</div>
          {gf[t].map((c,i)=>(
            <button key={i} onClick={()=>sacarFicha(i)} style={{...btn(),display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
              <Dot color={c} size={18}/> Sacar {CNAME[c]}
            </button>
          ))}
        </div>
      )}
      {(G.estado==='elegir_ini'||G.estado==='elegir_j1'||G.estado==='elegir_j2'||G.estado==='elegir')&&(
        <div>
          <div style={{fontSize:11,color:'#7a7570',marginBottom:10}}>Elegí una ficha:</div>
          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
            {COLS.map(col=>(
              <button key={col} onClick={()=>elegirFicha(col)}
                style={{background:'none',border:'none',cursor:'pointer',padding:4,borderRadius:'50%',
                  display:'flex',alignItems:'center',justifyContent:'center',transition:'transform 0.1s'}}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.18)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
                <div style={{width:isPC?56:46,height:isPC?56:46,borderRadius:'50%',background:CHX[col],
                  boxShadow:`0 3px 10px ${CHX[col]}88`}}/>
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
          :<AutoPass onMount={terminarTurno} msg="Sin canjes posibles — turno automático"/>
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
                    <TObj t={obj.t} sz={14}/>
                    <span style={{color:obj.t.com?'#e67e22':'#fff',fontWeight:700,fontSize:14}}>{pts} pts</span>
                    <span style={{fontSize:11,color:obj.t.com?'#888':'rgba(255,255,255,0.7)'}}>{obj.sob} sob.</span>
                  </div>
                </button>
              );
            })}
            <button style={btn()} onClick={terminarTurno}>No tomar — pasar turno</button>
          </>
        ):<AutoPass onMount={terminarTurno} msg=""/>
      )}
    </div>
  );

  const Fin=()=>G.fin?(
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

  const Modal=()=>modalCanje?(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:200,display:'flex',alignItems:isPC?'center':'flex-end',justifyContent:'center'}} onClick={()=>setModalCanje(false)}>
      <div style={{background:'white',borderRadius:isPC?'12px':'16px 16px 0 0',padding:isPC?28:20,width:'100%',maxWidth:isPC?680:520,maxHeight:'90vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
        <div style={{fontWeight:800,fontSize:15,color:'#c0392b',marginBottom:12}}>ELEGIR CANJE — {nom(t)}</div>
        <div style={{background:'#f8f8f8',border:'1.5px solid #e0dbd6',borderRadius:8,padding:'10px 12px',marginBottom:10}}>
          <div style={{fontSize:8,fontWeight:700,letterSpacing:1,textTransform:'uppercase',color:'#7a7570',marginBottom:6}}>Tus fichas</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>{gf[t].map((c,k)=><Dot key={k} color={c} size={isPC?32:26}/>)}</div>
        </div>
        {/* Últimos 3 movimientos del jugador activo */}
        {glog.filter(e=>e&&e.tipo==='canje'&&e.jugador===t).slice(-3).length>0&&(
          <div style={{background:'#f8f8f8',border:'1.5px solid #e0dbd6',borderRadius:8,padding:'10px 12px',marginBottom:10}}>
            <div style={{fontSize:8,fontWeight:700,letterSpacing:1,textTransform:'uppercase',color:'#7a7570',marginBottom:6}}>Tus últimos canjes</div>
            {glog.filter(e=>e&&e.tipo==='canje'&&e.jugador===t).slice(-3).reverse().map((e,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:6,marginBottom:i<2?5:0,opacity:1-i*0.2}}>
                <FRow arr={e.de} size={isPC?16:13}/>
                <span style={{color:'#aaa',fontWeight:700,fontSize:13}}>→</span>
                <FRow arr={e.por} size={isPC?16:13}/>
                <span style={{fontSize:9,color:'#ccc'}}>(T.{e.eqId})</span>
              </div>
            ))}
          </div>
        )}
        <div style={{background:'#f8f8f8',border:'1.5px solid #e0dbd6',borderRadius:8,padding:'10px 12px',marginBottom:14}}>
          <div style={{fontSize:8,fontWeight:700,letterSpacing:1,textTransform:'uppercase',color:'#7a7570',marginBottom:6}}>Tarjetas objetivo</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {gmons.filter(m=>m.length>0).map((m,i)=>(
              <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
                <TObj t={m[m.length-1]} sz={isPC?16:12}/>
                <span style={{fontSize:9,fontWeight:700,color:m.length<=3?'#c0392b':'#999'}}>{m.length}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontSize:11,color:'#7a7570',marginBottom:10,fontStyle:'italic'}}>Elegí el canje:</div>
        {canjesDisp.map((c,i)=>(
          <button key={i} onClick={()=>hacerCanje(c)} style={{display:'block',width:'100%',padding:isPC?'14px 16px':'12px 14px',marginBottom:7,background:'#f8f8f8',border:'1.5px solid #e0dbd6',borderRadius:9,fontFamily:'inherit',cursor:'pointer',textAlign:'left'}}>
            <div style={{display:'flex',alignItems:'center',gap:isPC?12:8,flexWrap:'wrap'}}>
              <FRow arr={c.de} size={isPC?30:18}/>
              <span style={{fontWeight:700,color:'#555',fontSize:isPC?22:18}}>→</span>
              <FRow arr={c.por} size={isPC?30:18}/>
              <span style={{fontSize:10,color:'#aaa'}}>(T.{c.eqId})</span>
            </div>
          </button>
        ))}
        <button onClick={()=>setModalCanje(false)} style={{display:'block',width:'100%',padding:9,background:'#f0ede8',border:'1px solid #d4cfc9',borderRadius:7,color:'#888',fontSize:12,cursor:'pointer',marginTop:4,fontFamily:'inherit'}}>
          Cancelar
        </button>
      </div>
    </div>
  ):null;

  const TablaPuntos=()=>(
    <div style={{background:'white',borderRadius:10,padding:'10px 14px',border:'1.5px solid #e8e3de',flexShrink:0}}>
      <div style={{fontSize:8,fontWeight:700,letterSpacing:1.5,textTransform:'uppercase',color:'#aaa',marginBottom:8}}>Tabla de puntajes</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        {[
          {label:'Fase 1',com:false,pts:[5,3,2,1]},
          {label:'Fase 1 ★',com:true,pts:[8,5,3,2]},
          {label:'Fase 2',com:false,pts:[8,5,3,2]},
          {label:'Fase 2 ★',com:true,pts:[12,8,5,3]},
        ].map((f,i)=>(
          <div key={i} style={{background:f.com?'#2a2a2a':'#f8f8f8',borderRadius:8,padding:'7px 10px',border:`1px solid ${f.com?'#555':'#e0dbd6'}`}}>
            <div style={{fontSize:9,fontWeight:700,color:f.com?'#ccc':'#555',marginBottom:5,display:'flex',alignItems:'center',gap:4}}>
              {G.fase===2&&f.label.startsWith('Fase 2')||G.fase===1&&f.label.startsWith('Fase 1')
                ?<span style={{width:6,height:6,borderRadius:'50%',background:'#e67e22',display:'inline-block'}}/>
                :null}
              {f.label}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:2}}>
              {f.pts.map((p,j)=>(
                <div key={j} style={{textAlign:'center'}}>
                  <div style={{fontSize:7,color:f.com?'#888':'#aaa'}}>{j===0?'0':j===1?'1':j===2?'2':'3+'}sob</div>
                  <div style={{fontSize:13,fontWeight:800,color:f.com?'#f0a500':'#c0392b'}}>{p}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── LAYOUT PC ──
  if(isPC) return(
    <div style={{height:'100vh',background:'#f0ede8',fontFamily:'system-ui,sans-serif',display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <Hdr/>
      <div style={{flex:1,display:'grid',gridTemplateColumns:'610px 1fr',overflow:'hidden'}}>
        <div style={{background:'white',borderRight:'1.5px solid #d4cfc9',padding:'16px',display:'flex',flexDirection:'column',gap:12,overflowY:'auto'}}>
          <PanelEq sz={36}/>
          <PanelHist max={24}/>
        </div>
        <div style={{padding:'14px 16px',display:'flex',flexDirection:'column',gap:12,overflow:'hidden'}}>
          {/* Zona scrolleable */}
          <div style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:12}}>
            <PanelPilas sz={20} grid={true}/>
            <TurnoBox/>
            <PanelJugadores dotSz={40}/>
            {!G.fin&&!bloqueado&&<Acciones/>}
            {G.fin&&<Fin/>}
          </div>
          {/* Tabla de puntajes fija abajo */}
          <TablaPuntos/>
        </div>
      </div>
      <Modal/>
    </div>
  );

  // ── LAYOUT MÓVIL ──
  return(
    <div style={{minHeight:'100vh',background:'#f0ede8',fontFamily:'system-ui,sans-serif',display:'flex',flexDirection:'column'}}>
      <Hdr/>
      <div style={{flex:1,overflowY:'auto',padding:'10px 12px',display:'flex',flexDirection:'column',gap:8}}>
        <PanelEq sz={13}/>
        <PanelPilas sz={11} grid={false}/>
        <PanelJugadores dotSz={24}/>
        <TurnoBox/>
        {!G.fin&&!bloqueado&&<Acciones/>}
        <PanelHist max={14}/>
        {G.fin&&<Fin/>}
      </div>
      <Modal/>
    </div>
  );
}

// ── APP ──
export default function App(){
  const [pant,setPant]=useState('menu');
  const [data,setData]=useState(null);

  if(pant==='setup-local') return(
    <Setup online={false}
      onStart={(j1,j2,sel,modo,empieza)=>{setData({j1,j2,sel,modo,empieza});setPant('game-local');}}
      onBack={()=>setPant('menu')}/>
  );
  if(pant==='game-local'&&data) return(
    <Game j1={data.j1} j2={data.j2} eqIds={data.sel} modo={data.modo} empieza={data.empieza||'azar'}
      miRol={-1} salaId={null} estadoInicial={null} onBack={()=>setPant('menu')}/>
  );

  if(pant==='lobby') return(
    <Lobby
      onJoin={(cod,nombre,rol)=>{
        setData({codigo:cod,miNombre:nombre,miRol:rol});
        setPant(rol===0?'setup-online':'espera');
      }}
      onBack={()=>setPant('menu')}/>
  );
  if(pant==='setup-online') return(
    <Setup online={true}
      onStart={(j1,j2,sel,modo,empieza)=>{
        set(ref(db,`salas/${data.codigo}/eqIds`),sel.map(Number));
        set(ref(db,`salas/${data.codigo}/modo`),modo);
        set(ref(db,`salas/${data.codigo}/empieza`),empieza||'azar');
        setData(d=>({...d,sel,modo,empieza}));
        setPant('espera');
      }}
      onBack={()=>setPant('lobby')}/>
  );
  if(pant==='espera'&&data) return(
    <Espera codigo={data.codigo} miRol={data.miRol} onBack={()=>setPant('menu')}/>
  );

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
        <button onClick={()=>setPant('setup-local')} style={{padding:'14px 20px',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:10,color:'#eaeaea',fontSize:15,fontWeight:600,cursor:'pointer',fontFamily:'inherit',textAlign:'center'}}>
          🎮 Local — mismo dispositivo
        </button>
        <button onClick={()=>setPant('lobby')} style={{padding:'14px 20px',background:'rgba(233,69,96,0.15)',border:'1px solid rgba(233,69,96,0.4)',borderRadius:10,color:'#e94560',fontSize:15,fontWeight:600,cursor:'pointer',fontFamily:'inherit',textAlign:'center'}}>
          🌐 Online — dispositivos distintos
        </button>
      </div>
    </div>
  );
}
