import React, { Suspense, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, Sparkles } from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown, ArrowUpRight, Github, Cpu, Orbit, Menu, X, Activity,
  Layers3, Radio, Globe2, Workflow, Database, ShieldCheck, Code2,
  MessageSquare, CheckCircle2
} from "lucide-react";
import * as THREE from "three";
import "./business.css";

const projects = [
  { n:"01", name:"Synapse Memory", type:"AI INFRASTRUCTURE", desc:"Open-source memory infrastructure for AI applications, combining hybrid retrieval, token-aware context selection, tenant isolation and developer observability.", stack:["Python","FastAPI","PostgreSQL","pgvector"], url:"https://github.com/721189/Synapse-Memory", accent:"cyan", status:"OPEN SOURCE" },
  { n:"02", name:"AetherLab", type:"ENVIRONMENTAL INTELLIGENCE", desc:"An environmental intelligence platform connecting satellite, weather and reanalysis data with evidence-grounded analysis workflows.", stack:["Python","Geospatial data","AI workflows","Data pipelines"], url:"https://github.com/721189/AetherLab", accent:"green", status:"INDEPENDENT BUILD" },
  { n:"03", name:"SWARMOS", type:"AUTONOMOUS SYSTEMS", desc:"A research-oriented swarm orchestration framework exploring decentralized coordination, anomaly-aware validation, failure injection and recovery.", stack:["Multi-agent systems","Python","Simulation","Reliability"], url:"https://github.com/721189/SWARMOS", accent:"violet", status:"RESEARCH BUILD" },
  { n:"04", name:"Market Metrics", type:"RESEARCH AUTOMATION", desc:"An evidence-first market research workflow that separates source discovery, model reasoning, claim verification and deterministic calculations.", stack:["TypeScript","AI workflows","Research","APIs"], url:"https://github.com/721189/Market-Metrics", accent:"amber", status:"INDEPENDENT BUILD" },
  { n:"05", name:"OmniApply Agent", type:"AGENTIC WORKFLOWS", desc:"An AI-assisted workflow for organizing job research and preparing application materials from a candidate's technical footprint.", stack:["AI agents","Automation","Full-stack"], url:"https://github.com/721189/OmniApply-Agent", accent:"pink", status:"PROTOTYPE" },
  { n:"06", name:"Swarm Robotics", type:"MULTI-AGENT SIMULATION", desc:"A simulation environment for decentralized robot coordination under communication constraints, packet loss and fault recovery.", stack:["Robotics","Simulation","TDMA","Python"], url:"https://github.com/721189/swarm-robotics", accent:"blue", status:"RESEARCH" }
];

const services = [
  { icon:Cpu, number:"01", title:"AI features & agent workflows", description:"Integrate model APIs into real product flows: retrieval and RAG, tool calling, structured outputs, evaluation and workflow automation.", tags:["LLM integrations","RAG","Agents"] },
  { icon:Code2, number:"02", title:"Full-stack product development", description:"Build and extend user-facing applications, API endpoints and database-backed features that fit an existing product and codebase.", tags:["React","TypeScript","Node.js"] },
  { icon:Database, number:"03", title:"Backend & data integrations", description:"Connect third-party services, design API contracts, implement ingestion workflows and work with relational stores and background jobs.", tags:["Python","FastAPI","PostgreSQL"] },
  { icon:ShieldCheck, number:"04", title:"Testing & engineering handoff", description:"Investigate defects, add regression coverage, improve observability and leave behind clear setup notes and implementation documentation.", tags:["Testing","Reliability","Deployment"] }
];

const workflow = [
  ["01","Define the task","Agree on the problem, existing stack, constraints and acceptance criteria before implementation."],
  ["02","Scope the milestone","Break the work into deliverables, dependencies and a clear review point."],
  ["03","Build and verify","Implement in the existing workflow, share progress and test the important paths."],
  ["04","Handoff cleanly","Deliver code, setup notes and known limitations so the team can maintain the result."]
];

function NetworkCore() {
  const points = useMemo(() => {
    const result: THREE.Vector3[] = [];
    for (let i=0;i<34;i++) {
      const phi=Math.acos(-1+(2*i)/34);
      const theta=Math.sqrt(34*Math.PI)*phi;
      result.push(new THREE.Vector3(1.72*Math.cos(theta)*Math.sin(phi),1.72*Math.sin(theta)*Math.sin(phi),1.72*Math.cos(phi)));
    }
    return result;
  },[]);
  const ref = React.useRef<THREE.Group>(null);
  useFrame((state,delta) => {
    if(ref.current) {
      ref.current.rotation.y += delta*0.075;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime*0.15)*0.12;
    }
  });
  const links = useMemo(() => {
    const result: [THREE.Vector3,THREE.Vector3][] = [];
    points.forEach((point,index)=>points.slice(index+1).forEach(next=>{
      if(point.distanceTo(next)<0.95) result.push([point,next]);
    }));
    return result;
  },[points]);
  return <group ref={ref}>
    <mesh><icosahedronGeometry args={[1.65,2]}/><meshBasicMaterial color="#07131e" wireframe transparent opacity={0.12}/></mesh>
    {links.map((link,index)=><Line key={index} points={link} color="#42d9ef" transparent opacity={0.22} lineWidth={0.7}/>)}
    {points.map((point,index)=><mesh key={index} position={point.toArray()}><sphereGeometry args={[index%5===0?0.045:0.022,12,12]}/><meshBasicMaterial color={index%5===0?"#a78bfa":"#6de8f4"}/></mesh>)}
    <mesh><sphereGeometry args={[0.42,32,32]}/><meshBasicMaterial color="#0b2635" transparent opacity={0.8}/></mesh>
    <mesh><sphereGeometry args={[0.46,32,32]}/><meshBasicMaterial color="#5ee7f4" wireframe transparent opacity={0.34}/></mesh>
  </group>;
}

function HeroScene() {
  const reduce=useReducedMotion();
  return <div className="scene">
    <Canvas camera={{position:[0,0,6.5],fov:42}} dpr={[1,1.6]} gl={{alpha:true,antialias:true}}>
      <ambientLight intensity={0.6}/>
      <Suspense fallback={null}>
        <Float speed={reduce?0:1.1} rotationIntensity={0.12} floatIntensity={0.25}><NetworkCore/></Float>
        <Sparkles count={90} scale={7} size={1.5} speed={0.22} opacity={0.55} color="#73e8f3"/>
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduce} autoRotateSpeed={0.25}/>
    </Canvas>
    <div className="scene-glow"/>
  </div>;
}

function App() {
  const [menu,setMenu]=useState(false);
  const reduce=useReducedMotion();
  const reveal={hidden:{opacity:0,y:24},show:{opacity:1,y:0,transition:{duration:0.65}}};
  const close=()=>setMenu(false);
  const contactUrl="https://www.linkedin.com/in/shivam-singh360";
  return <div className="app-shell">
    <div className="noise"/>
    <header className="topbar">
      <a className="brand" href="#home" onClick={close}><img className="brand-portrait" src="/shivam-portrait.webp" alt="Illustrated portrait of Shivam Singh" width="44" height="44" fetchPriority="high" decoding="async"/><span className="brand-name">Shivam Singh</span></a>
      <nav className={menu?"nav-links open":"nav-links"} aria-label="Main navigation">
        {[["Services","#services"],["Work","#projects"],["About","#about"],["Contact","#contact"]].map(([label,href])=><a key={href} href={href} onClick={close}>{label}</a>)}
      </nav>
      <a className="nav-cta" href="#contact">DISCUSS A PROJECT <ArrowUpRight size={14}/></a>
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <motion.div initial="hidden" animate="show" variants={reveal} className="eyebrow"><span className="pulse-dot"/> REMOTE ENGINEERING SUPPORT <span className="eyebrow-line"/></motion.div>
          <motion.h1 initial="hidden" animate="show" variants={{hidden:{opacity:0,y:35},show:{opacity:1,y:0,transition:{duration:0.8,delay:0.08}}}}>
            AI-powered<br/>products and<br/><em>reliable systems</em><span className="period">.</span>
          </motion.h1>
          <motion.p className="hero-description" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.28,duration:0.7}}>
            I help software companies and AI teams move scoped engineering work forward — from full-stack features and AI integrations to backend systems, testing and clean handoffs.
          </motion.p>
          <motion.div className="hero-actions" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}>
            <a className="button-primary" href="#contact">DISCUSS A PROJECT <ArrowUpRight size={16}/></a>
            <a className="button-quiet" href="#projects"><Code2 size={16}/> VIEW ENGINEERING WORK</a>
          </motion.div>
          <div className="hero-meta"><span><span className="tiny-dot"/> IIT MADRAS · BS DATA SCIENCE</span><span>REMOTE · INDIA</span></div>
        </div>
        <div className="hero-visual">
          <div className="visual-label top"><span>FIG 01 / SYSTEM CORE</span><span>INTERACTIVE MODEL</span></div>
          <HeroScene/>
          <div className="visual-coordinates">AI ENGINEERING / 001<br/>FULL-STACK SYSTEMS</div>
          <div className="orbit-tag tag-one"><Cpu size={13}/> AI SYSTEMS</div>
          <div className="orbit-tag tag-two"><Orbit size={13}/> PRODUCT ENGINEERING</div>
        </div>
        <a className="scroll-cue" href="#services"><span>EXPLORE HOW I CAN HELP</span><ArrowDown size={14}/></a>
      </section>

      <section className="ticker" aria-label="Engineering capabilities"><div className="ticker-track">
        {Array.from({length:2}).flatMap((_,i)=>["AI PRODUCT INTEGRATIONS","FULL-STACK DEVELOPMENT","BACKEND APIS","DATA WORKFLOWS","TESTING & RELIABILITY","AGENCY DELIVERY SUPPORT"].map((item,j)=><span key={i+"-"+j}>{item}<i>✳</i></span>))}
      </div></section>

      <section className="section-wrap service-section" id="services">
        <div className="section-kicker"><span>01 / ENGINEERING SUPPORT</span><span>WAYS TO COLLABORATE</span></div>
        <div className="service-heading">
          <div><p className="eyebrow">PRACTICAL, SCOPED DELIVERY</p><h2>Extra engineering<br/><em>capacity when you need it.</em></h2></div>
          <p className="service-intro">Work can start with one clearly defined feature, integration or paid pilot — designed around your existing product, codebase and delivery process.</p>
        </div>
        <div className="service-grid">{services.map((service,index)=><motion.article className="service-card" key={service.number} initial={reduce?false:"hidden"} whileInView="show" viewport={{once:true,amount:0.18}} variants={{hidden:{opacity:0,y:22},show:{opacity:1,y:0,transition:{duration:0.45,delay:index*0.06}}}}>
          <div className="service-card-top"><service.icon size={20}/><span>{service.number}</span></div>
          <h3>{service.title}</h3><p>{service.description}</p>
          <div className="chips">{service.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
        </motion.article>)}</div>
        <div className="fit-strip"><span>GOOD FIT FOR</span><p>Agency overflow <b>·</b> Feature implementation <b>·</b> AI integrations <b>·</b> Backend/API work <b>·</b> Short engineering sprints</p></div>
      </section>

      <section className="section-wrap about-section" id="about">
        <div className="section-kicker"><span>02 / THE ENGINEER</span><span>ABOUT</span></div>
        <div className="about-grid">
          <motion.div className="about-heading" initial={reduce?false:"hidden"} whileInView="show" viewport={{once:true,amount:0.25}} variants={reveal}><h2>From system design<br/>to <em>working software.</em></h2></motion.div>
          <motion.div className="about-copy" initial={reduce?false:"hidden"} whileInView="show" viewport={{once:true,amount:0.25}} variants={reveal}>
            <p className="lead">I’m an independent engineering contributor and an IIT Madras BS student focused on AI engineering and full-stack systems.</p>
            <p>I build across AI infrastructure, agentic workflows, data-intensive applications and autonomous systems. I enjoy the complete engineering loop: understanding a requirement, designing the implementation, testing important failure paths and documenting what ships.</p>
            <p>For agency and product teams, I’m most useful on well-scoped technical work that can be reviewed against clear acceptance criteria. I work remotely from India and can collaborate asynchronously with an existing team.</p>
            <a className="text-link" href="https://github.com/721189?tab=repositories" target="_blank" rel="noreferrer">INSPECT THE CODE <ArrowUpRight size={15}/></a>
          </motion.div>
        </div>
        <div className="proof-grid">
          <div><span className="proof-icon"><Layers3 size={18}/></span><strong>End-to-end</strong><small>Architecture, implementation and deployment workflows</small></div>
          <div><span className="proof-icon"><CheckCircle2 size={18}/></span><strong>Test-minded</strong><small>Regression checks, failure paths and verifiable changes</small></div>
          <div><span className="proof-icon"><Workflow size={18}/></span><strong>Integration-focused</strong><small>APIs, data flows and AI capabilities inside products</small></div>
          <div><span className="proof-icon"><Globe2 size={18}/></span><strong>Remote-ready</strong><small>Milestone-based work and clear written handoffs</small></div>
        </div>
      </section>

      <section className="section-wrap projects-section" id="projects">
        <div className="section-kicker"><span>03 / SELECTED BUILDS</span><span>PUBLIC ENGINEERING WORK</span></div>
        <div className="section-heading"><h2>Work you can<br/><em>inspect for yourself.</em></h2><p>Independent builds and research prototypes. Open the repositories to review implementation details, architecture and project history.</p></div>
        <div className="project-list">{projects.map((project,index)=><motion.a href={project.url} target="_blank" rel="noreferrer" className={"project-card "+project.accent} key={project.n} initial={reduce?false:"hidden"} whileInView="show" viewport={{once:true,amount:0.12}} variants={{hidden:{opacity:0,y:28},show:{opacity:1,y:0,transition:{duration:0.5,delay:index*0.045}}}}>
          <div className="project-number">{project.n}</div>
          <div className="project-main"><div className="project-type">{project.type}</div><h3>{project.name}</h3><p>{project.desc}</p><div className="chips">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div></div>
          <div className="project-side"><span className="project-status">{project.status}</span><span className="project-arrow" aria-label={"View "+project.name+" repository"}><ArrowUpRight size={19}/></span></div>
        </motion.a>)}</div>
        <div className="project-footnote"><span>01 / CODE & IMPLEMENTATION</span><a href="https://pypi.org/project/synapse-memory-engine/" target="_blank" rel="noreferrer">SYNAPSE MEMORY PYPI PACKAGE <ArrowUpRight size={14}/></a></div>
      </section>

      <section className="section-wrap process-section" id="process">
        <div className="section-kicker"><span>04 / DELIVERY APPROACH</span><span>HOW WORK GETS DONE</span></div>
        <div className="process-heading"><h2>Clear scope.<br/><em>Clean handoff.</em></h2><p>A straightforward collaboration model that protects the team’s time and keeps progress reviewable.</p></div>
        <div className="process-grid">{workflow.map(([number,title,description])=><article className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        <div className="paid-pilot"><div><MessageSquare size={19}/><strong>Start with a paid, well-defined milestone.</strong></div><p>Share the requirement, current stack, constraints and expected outcome. We can confirm fit and scope before any implementation begins.</p></div>
      </section>

      <section className="section-wrap research-section" id="research">
        <div className="section-kicker"><span>05 / TECHNICAL INTERESTS</span><span>RESEARCH FRONTIER</span></div>
        <div className="research-grid">
          <div><h2>Systems at the<br/><em>edge of autonomy.</em></h2><p className="research-intro">Alongside product engineering, I explore how intelligent systems coordinate, make decisions and remain dependable when the environment is uncertain.</p></div>
          <div className="research-items">{[
            [Radio,"01","Communication-constrained swarms","Local coordination, packet loss, TDMA and multi-hop networks."],
            [Activity,"02","Fault tolerance & resilience","Failure injection, recovery, reliability metrics and robust autonomy."],
            [Layers3,"03","Reliable AI infrastructure","Retrieval quality, evaluation, observability and trustworthy agents."],
            [Globe2,"04","Environmental intelligence","Geospatial data, remote sensing and evidence-grounded analysis."]
          ].map(([Icon,number,title,description]:any)=><div className="research-item" key={number}><Icon size={19}/><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight size={15}/></div>)}</div>
        </div>
      </section>

      <section className="section-wrap toolkit-section">
        <div className="section-kicker"><span>06 / THE TOOLBOX</span><span>TECHNICAL PRACTICE</span></div>
        <div className="toolkit-grid"><h2>Tools are the<br/><em>means, not the goal.</em></h2><div className="tool-groups">
          <div><span>LANGUAGES</span><p>Python <b>/</b> TypeScript <b>/</b> JavaScript <b>/</b> SQL <b>/</b> C++</p></div>
          <div><span>APPLICATIONS</span><p>React <b>/</b> Next.js <b>/</b> FastAPI <b>/</b> Node.js</p></div>
          <div><span>DATA & INFRASTRUCTURE</span><p>PostgreSQL <b>/</b> Redis <b>/</b> Docker <b>/</b> Git</p></div>
          <div><span>FOCUS AREAS</span><p>RAG <b>/</b> AI agents <b>/</b> Distributed systems <b>/</b> Robotics</p></div>
        </div></div>
      </section>

      <section className="contact-section" id="contact"><div className="contact-orb"/><div className="section-wrap contact-inner">
        <div className="section-kicker"><span>07 / START A CONVERSATION</span><span>REMOTE COLLABORATION</span></div>
        <p className="eyebrow">NEED AN EXTRA ENGINEERING HAND?</p>
        <h2>Let’s move your<br/><em>next deliverable.</em></h2>
        <p className="contact-copy">Send the task, the current stack and what a successful handoff looks like. I’ll review the requirements and respond about fit and scope.</p>
        <div className="contact-actions"><a className="button-primary" href={contactUrl} target="_blank" rel="noreferrer">MESSAGE ON LINKEDIN <ArrowUpRight size={16}/></a><a className="button-quiet" href="https://github.com/721189" target="_blank" rel="noreferrer"><Github size={16}/> REVIEW GITHUB</a></div>
        <p className="contact-note">For software agencies, AI studios and early-stage product teams seeking scoped remote engineering support.</p>
      </div></section>
    </main>

    <footer className="footer section-wrap">
      <a className="brand" href="#home"><span className="brand-mark">S<span>.</span></span><span>SHIVAM SINGH</span></a>
      <span>ENGINEERED WITH CURIOSITY. DELIVERED WITH CARE.</span>
      <a href="#home">BACK TO TOP ↑</a><small>© {new Date().getFullYear()} SHIVAM SINGH</small>
    </footer>
  </div>;
}

export default App;
