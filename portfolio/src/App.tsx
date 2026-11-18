import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, Sparkles } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, ExternalLink, Code2, Cpu, Orbit, FlaskConical, Menu, X, Activity, Terminal, Layers3, Radio, Globe2 } from "lucide-react";
import * as THREE from "three";

const projects = [
  { n:"01", name:"Synapse Memory", type:"AI INFRASTRUCTURE", desc:"Persistent memory infrastructure for AI applications, with hybrid retrieval, token-aware context selection, tenant isolation and developer observability.", stack:["Python","FastAPI","PostgreSQL","pgvector"], url:"https://github.com/721189/Synapse-Memory", accent:"cyan", status:"OPEN SOURCE" },
  { n:"02", name:"AetherLab", type:"ENVIRONMENTAL INTELLIGENCE", desc:"An environmental intelligence platform connecting satellite and reanalysis data with evidence-grounded autonomous workflows.", stack:["Python","Geospatial","AI Agents","Data Pipelines"], url:"https://github.com/721189/AetherLab", accent:"green", status:"RESEARCH / BUILD" },
  { n:"03", name:"SWARMOS", type:"AUTONOMOUS SYSTEMS", desc:"Research-oriented swarm orchestration exploring decentralized coordination, anomaly-aware validation, fault injection and resilient recovery.", stack:["Multi-agent systems","Python","Simulation","Reliability"], url:"https://github.com/721189/SWARMOS", accent:"violet", status:"RESEARCH" },
  { n:"04", name:"Market Metrics", type:"RESEARCH AUTOMATION", desc:"An evidence-first market research workflow separating source discovery, model reasoning, claim verification and deterministic calculations.", stack:["TypeScript","AI Workflows","Research","APIs"], url:"https://github.com/721189/Market-Metrics", accent:"amber", status:"PRODUCT ENGINEERING" },
  { n:"05", name:"OmniApply Agent", type:"AGENTIC WORKFLOWS", desc:"An AI-assisted career workflow for organizing job research and preparing application materials from a candidate's technical footprint.", stack:["AI Agents","Automation","Full-stack"], url:"https://github.com/721189/OmniApply-Agent", accent:"pink", status:"BUILD" },
  { n:"06", name:"Swarm Robotics", type:"MULTI-AGENT SIMULATION", desc:"A simulation environment for decentralized robot coordination under communication constraints, packet loss and fault recovery.", stack:["Robotics","Simulation","TDMA","Python"], url:"https://github.com/721189/swarm-robotics", accent:"blue", status:"EXPERIMENTS" }
];

function NetworkCore() {
  const group = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i=0;i<34;i++) {
      const phi = Math.acos(-1 + (2*i)/34);
      const theta = Math.sqrt(34*Math.PI)*phi;
      points.push(new THREE.Vector3(1.72*Math.cos(theta)*Math.sin(phi),1.72*Math.sin(theta)*Math.sin(phi),1.72*Math.cos(phi)));
    }
    return points;
  }, []);
  const ref = React.useRef<THREE.Group>(null);
  useFrame((state, delta) => { if(ref.current) { ref.current.rotation.y += delta*0.075; ref.current.rotation.x = Math.sin(state.clock.elapsedTime*0.15)*0.12; } });
  const links = useMemo(() => {
    const out: [THREE.Vector3,THREE.Vector3][] = [];
    group.forEach((p,i)=>group.slice(i+1).forEach(q=>{ if(p.distanceTo(q)<0.95) out.push([p,q]); }));
    return out;
  },[group]);
  return <group ref={ref}>
    <mesh><icosahedronGeometry args={[1.65,2]}/><meshBasicMaterial color="#07131e" wireframe transparent opacity={0.12}/></mesh>
    {links.map((l,i)=><Line key={i} points={l} color="#42d9ef" transparent opacity={0.22} lineWidth={0.7}/>)}
    {group.map((p,i)=><mesh key={i} position={p.toArray()}><sphereGeometry args={[i%5===0?0.045:0.022,12,12]}/><meshBasicMaterial color={i%5===0?"#a78bfa":"#6de8f4"} /></mesh>)}
    <mesh><sphereGeometry args={[0.42,32,32]}/><meshBasicMaterial color="#0b2635" transparent opacity={0.8}/></mesh>
    <mesh><sphereGeometry args={[0.46,32,32]}/><meshBasicMaterial color="#5ee7f4" wireframe transparent opacity={0.34}/></mesh>
  </group>;
}

function HeroScene() {
  const reduce = useReducedMotion();
  return <div className="scene">
    <Canvas camera={{position:[0,0,6.5],fov:42}} dpr={[1,1.6]} gl={{alpha:true,antialias:true}}>
      <ambientLight intensity={0.6}/>
      <Suspense fallback={null}>
        <Float speed={reduce?0:1.1} rotationIntensity={0.12} floatIntensity={0.25}><NetworkCore/></Float>
        <Sparkles count={90} scale={7} size={1.5} speed={0.22} opacity={0.55} color="#73e8f3"/>
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduce} autoRotateSpeed={0.25} />
    </Canvas>
    <div className="scene-glow"/>
  </div>;
}

function useGithub() {
  const [stats,setStats] = useState<{repos:number;followers:number;stars:number}|null>(null);
  useEffect(()=> {
    let active=true;
    fetch("https://api.github.com/users/721189")
      .then(r=>r.ok?r.json():Promise.reject())
      .then(async user=>{
        const r=await fetch("https://api.github.com/users/721189/repos?per_page=100&sort=updated");
        if(!r.ok) throw new Error("GitHub API unavailable");
        const repos=await r.json();
        if(active) setStats({repos:user.public_repos,followers:user.followers,stars:repos.reduce((n:number,x:{stargazers_count:number})=>n+x.stargazers_count,0)});
      }).catch(()=>{});
    return ()=>{active=false};
  },[]);
  return stats;
}

function App() {
  const [menu,setMenu]=useState(false);
  const stats=useGithub();
  const reduce=useReducedMotion();
  const reveal={hidden:{opacity:0,y:24},show:{opacity:1,y:0,transition:{duration:0.65}}};
  const close=()=>setMenu(false);
  return <div className="app-shell">
    <div className="noise"/>
    <header className="topbar">
      <a className="brand" href="#home" onClick={close}><span className="brand-mark">S<span>.</span></span><span>SHIVAM SINGH</span></a>
      <nav className={menu?"nav-links open":"nav-links"}>
        {[["About","#about"],["Projects","#projects"],["Research","#research"],["Connect","#contact"]].map(([label,href])=><a key={href} href={href} onClick={close}>{label}</a>)}
      </nav>
      <a className="nav-cta" href="https://github.com/721189" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={14}/></a>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <motion.div initial="hidden" animate="show" variants={reveal} className="eyebrow"><span className="pulse-dot"/> ENGINEERING INTELLIGENCE <span className="eyebrow-line"/></motion.div>
          <motion.h1 initial="hidden" animate="show" variants={{hidden:{opacity:0,y:35},show:{opacity:1,y:0,transition:{duration:.8,delay:.08}}}}>Building systems<br/>that <em>think, adapt</em><br/>and endure<span className="period">.</span></motion.h1>
          <motion.p className="hero-description" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.28,duration:.7}}>I'm Shivam — an engineering student exploring AI systems, full-stack engineering and autonomous intelligence. I turn ambitious ideas into software that works in the real world.</motion.p>
          <motion.div className="hero-actions" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.5}}>
            <a className="button-primary" href="#projects">EXPLORE MY WORK <ArrowUpRight size={16}/></a>
            <a className="button-quiet" href="https://www.linkedin.com/in/shivam-singh360" target="_blank" rel="noreferrer"><Linkedin size={16}/> CONNECT</a>
          </motion.div>
          <div className="hero-meta"><span><span className="tiny-dot"/> IIT MADRAS · BS DATA SCIENCE</span><span>BASED IN INDIA</span></div>
        </div>
        <div className="hero-visual"><div className="visual-label top"><span>FIG 01 / SYSTEM CORE</span><span>LIVE RENDER</span></div><HeroScene/><div className="visual-coordinates">INTELLIGENCE / 001<br/>AUTONOMOUS SYSTEMS</div><div className="orbit-tag tag-one"><Cpu size={13}/> AI SYSTEMS</div><div className="orbit-tag tag-two"><Orbit size={13}/> MULTI-AGENT</div></div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14}/></a>
      </section>

      <section className="ticker" aria-label="Areas of focus"><div className="ticker-track">{Array.from({length:2}).flatMap((_,i)=>["AI ENGINEERING","AUTONOMOUS AGENTS","SYSTEMS DESIGN","SWARM ROBOTICS","FULL-STACK DEVELOPMENT","RESEARCH & EXPERIMENTS"].map((x,j)=><span key={i+"-"+j}>{x}<i>✳</i></span>))}</div></section>

      <section className="section-wrap about-section" id="about">
        <div className="section-kicker"><span>01 / THE ENGINEER</span><span>ABOUT</span></div>
        <div className="about-grid">
          <motion.div initial={reduce?false:"hidden"} whileInView="show" viewport={{once:true,amount:.25}} variants={reveal}><h2>Curiosity into<br/><em>capability.</em></h2></motion.div>
          <motion.div className="about-copy" initial={reduce?false:"hidden"} whileInView="show" viewport={{once:true,amount:.25}} variants={reveal}>
            <p className="lead">I like working where software, intelligence and complex systems meet.</p>
            <p>My work moves across AI infrastructure, agentic workflows, data-intensive applications and decentralized robotics. I enjoy the complete engineering loop: understanding a problem, designing the system, implementing it, testing the edges and shipping something people can use.</p>
            <p>I'm currently pursuing the BS in Data Science and Applications at IIT Madras while deepening my practice in AI engineering and systems research.</p>
            <a className="text-link" href="https://github.com/721189?tab=repositories" target="_blank" rel="noreferrer">EXPLORE THE CODE <ArrowUpRight size={15}/></a>
          </motion.div>
        </div>
        <div className="stats-row">
          <div><strong>{stats?stats.repos:"—"}</strong><span>PUBLIC REPOSITORIES</span></div>
          <div><strong>{stats?stats.stars:"—"}</strong><span>REPOSITORY STARS</span></div>
          <div><strong>{stats?stats.followers:"—"}</strong><span>GITHUB FOLLOWERS</span></div>
          <div><strong>∞</strong><span>THINGS TO EXPLORE</span></div>
          <small>{stats?"LIVE FROM GITHUB API":"GITHUB METRICS LOADING / API FALLBACK"}</small>
        </div>
      </section>

      <section className="section-wrap projects-section" id="projects">
        <div className="section-kicker"><span>02 / SELECTED BUILDS</span><span>PROJECT INDEX</span></div>
        <div className="section-heading"><h2>Built with intent.<br/><em>Engineered to matter.</em></h2><p>A selection of systems, experiments and tools — each built to explore a real technical problem.</p></div>
        <div className="project-list">{projects.map((p,i)=><motion.a href={p.url} target="_blank" rel="noreferrer" className={"project-card "+p.accent} key={p.n} initial={reduce?false:"hidden"} whileInView="show" viewport={{once:true,amount:.12}} variants={{hidden:{opacity:0,y:28},show:{opacity:1,y:0,transition:{duration:.5,delay:i*.045}}}}>
          <div className="project-number">{p.n}</div><div className="project-main"><div className="project-type">{p.type}</div><h3>{p.name}</h3><p>{p.desc}</p><div className="chips">{p.stack.map(t=><span key={t}>{t}</span>)}</div></div><div className="project-side"><span className="project-status">{p.status}</span><span className="project-arrow"><ArrowUpRight size={19}/></span></div>
        </motion.a>)}</div>
      </section>

      <section className="section-wrap research-section" id="research">
        <div className="section-kicker"><span>03 / OPEN QUESTIONS</span><span>RESEARCH FRONTIER</span></div>
        <div className="research-grid"><div><h2>Systems at the<br/><em>edge of autonomy.</em></h2><p className="research-intro">I'm interested in how intelligent systems coordinate, make decisions and remain dependable when the environment is uncertain.</p></div>
          <div className="research-items">
            {[[Radio,"01","Communication-constrained swarms","Local coordination, packet loss, TDMA and multi-hop networks."],[Activity,"02","Fault tolerance & resilience","Failure injection, recovery, reliability metrics and robust autonomy."],[Layers3,"03","Reliable AI infrastructure","Retrieval quality, evaluation, observability and trustworthy agents."],[Globe2,"04","Environmental intelligence","Geospatial data, remote sensing and evidence-grounded analysis."]].map(([Icon,n,title,desc]:any)=><div className="research-item" key={n}><Icon size={19}/><span>{n}</span><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight size={15}/></div>)}
          </div>
        </div>
      </section>

      <section className="section-wrap toolkit-section">
        <div className="section-kicker"><span>04 / THE TOOLBOX</span><span>TECHNICAL PRACTICE</span></div>
        <div className="toolkit-grid"><h2>Tools are the<br/><em>means, not the goal.</em></h2><div className="tool-groups">
          <div><span>LANGUAGES</span><p>Python <b>/</b> TypeScript <b>/</b> JavaScript <b>/</b> SQL <b>/</b> C++</p></div>
          <div><span>APPLICATIONS</span><p>React <b>/</b> Next.js <b>/</b> FastAPI <b>/</b> Node.js</p></div>
          <div><span>DATA & INFRASTRUCTURE</span><p>PostgreSQL <b>/</b> Redis <b>/</b> Docker <b>/</b> Git</p></div>
          <div><span>FOCUS AREAS</span><p>RAG <b>/</b> AI Agents <b>/</b> Distributed Systems <b>/</b> Robotics</p></div>
        </div></div>
      </section>

      <section className="contact-section" id="contact"><div className="contact-orb"/><div className="section-wrap contact-inner"><div className="section-kicker"><span>05 / NEXT CONNECTION</span><span>OPEN TO IDEAS</span></div><p className="eyebrow">HAVE A GOOD PROBLEM?</p><h2>Let's build<br/><em>what's next.</em></h2><p className="contact-copy">For engineering collaborations, research conversations and interesting problems worth solving.</p><div className="contact-actions"><a className="button-primary" href="https://www.linkedin.com/in/shivam-singh360" target="_blank" rel="noreferrer">CONNECT ON LINKEDIN <ArrowUpRight size={16}/></a><a className="button-quiet" href="https://github.com/721189" target="_blank" rel="noreferrer"><Github size={16}/> GITHUB</a></div></div></section>
    </main>
    <footer className="footer section-wrap"><a className="brand" href="#home"><span className="brand-mark">S<span>.</span></span><span>SHIVAM SINGH</span></a><span>DESIGNED & ENGINEERED WITH CURIOSITY.</span><a href="#home">BACK TO TOP ↑</a><small>© {new Date().getFullYear()} SHIVAM SINGH</small></footer>
  </div>;
}

import React from "react";
export default App;
