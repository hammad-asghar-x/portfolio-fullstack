"""
Ultimate Ingestion script to populate LanceDB with comprehensive portfolio knowledge.
Covers Identity, Education, Experience, Full-Stack Skills, Projects, Availability, and Meta info.

CHUNKING STRATEGY:
Each entry is intentionally atomic (one topic/fact-cluster per chunk) rather than
one giant paragraph per category. This matters for RAG retrieval quality:
a query embedding for "what's your GPA" competes cleanly against a small,
focused chunk instead of getting diluted inside a paragraph that also talks
about scholarships and coursework. When in doubt, split further rather than merge.

Run with: python ingest.py
"""
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import lancedb
from fastembed import TextEmbedding
from app.core.config import settings


def get_embeddings(texts: list[str]) -> list[list[float]]:
    print("Loading FastEmbed model...")
    model = TextEmbedding(model_name=settings.EMBEDDING_MODEL)
    return list(model.embed(texts))


def ingest_knowledge():
    print("\n" + "=" * 60)
    print("🚀 STARTING ULTIMATE KNOWLEDGE INGESTION")
    print("=" * 60)

    knowledge_entries = [

        # ============================================================
        # 1. IDENTITY
        # ============================================================
        {
            "id": "identity_who",
            "text": "Hammad Asghar is a Full Stack Web Developer and AI Enthusiast based in Burma Town, Islamabad, Pakistan. He builds fast, scalable, AI-powered web applications, bridging modern frontend interfaces with robust backend systems.",
            "metadata": {"category": "identity"}
        },
        {
            "id": "identity_pitch",
            "text": "Elevator pitch: Hammad is a developer who bridges the gap between modern frontend interfaces and robust backend systems, with a strong focus on integrating AI and RAG (Retrieval-Augmented Generation) architectures into real-world products.",
            "metadata": {"category": "identity"}
        },
        {
            "id": "identity_current_focus",
            "text": "Hammad currently identifies primarily as a Full Stack Web Developer, with a growing specialization in AI Engineering — specifically RAG pipelines, vector databases, and LLM integration into production apps.",
            "metadata": {"category": "identity"}
        },

        # ============================================================
        # 2. EDUCATION
        # ============================================================
        {
            "id": "edu_degree",
            "text": "Hammad is pursuing a Bachelor of Science (BS) in Software Engineering at Capital University of Science and Technology (CUST) in Islamabad, Pakistan.",
            "metadata": {"category": "education"}
        },
        {
            "id": "edu_gpa",
            "text": "Hammad's current CGPA at CUST is 3.76, reflecting strong and consistent academic performance throughout his Software Engineering degree.",
            "metadata": {"category": "education"}
        },
        {
            "id": "edu_coursework",
            "text": "Relevant coursework Hammad has completed includes Software Design & Architecture, Web Engineering, Human-Computer Interaction (HCI), Information Security, and Parallel/Distributed Computing.",
            "metadata": {"category": "education"}
        },
        {
            "id": "edu_scholarship",
            "text": "Hammad is a recipient of the DIYA Scholarship, awarded in recognition of his academic dedication and performance.",
            "metadata": {"category": "education"}
        },
        {
            "id": "edu_learning_style",
            "text": "Hammad prefers practical, project-based learning over pure theory. He learns fastest by building real-world projects and debugging real problems rather than following tutorials passively.",
            "metadata": {"category": "education"}
        },

        # ============================================================
        # 3. WORK EXPERIENCE
        # ============================================================
        {
            "id": "exp_current_role",
            "text": "Hammad is currently a Full Stack Web Developer Intern at Rendlen Solutions, on an 8-week performance-based internship.",
            "metadata": {"category": "experience"}
        },
        {
            "id": "exp_responsibilities",
            "text": "At Rendlen Solutions, Hammad builds responsive web applications, implements clean architecture, and collaborates with senior developers on real production features.",
            "metadata": {"category": "experience"}
        },
        {
            "id": "exp_work_style",
            "text": "Hammad thrives in self-driven environments — he describes his internship as '1% mentorship, 99% self-driven effort,' meaning he independently researches, debugs, and ships without heavy hand-holding.",
            "metadata": {"category": "experience"}
        },
        {
            "id": "exp_debugging_approach",
            "text": "When Hammad hits a difficult bug, his approach is systematic: he adds targeted logging to isolate the failure point, writes focused tests to reproduce it reliably, and refactors API contracts when the root cause is a design/interface mismatch rather than a one-line fix.",
            "metadata": {"category": "experience"}
        },
        {
            "id": "exp_years",
            "text": "Hammad has 4 years of hands-on coding experience, built up throughout his university life at CUST — spanning coursework projects, personal projects, and his current internship.",
            "metadata": {"category": "experience"}
        },

        # ============================================================
        # 4. SKILLS — FRONTEND
        # ============================================================
        {
            "id": "skills_frontend_core",
            "text": "Frontend core stack: Hammad builds interfaces primarily with Next.js (App Router), React, and TypeScript, styled with Tailwind CSS.",
            "metadata": {"category": "skills"}
        },
        {
            "id": "skills_frontend_state",
            "text": "For frontend state management, Hammad primarily uses React's Context API. He is comfortable choosing lighter state solutions over heavier libraries when a project's complexity doesn't justify the overhead.",
            "metadata": {"category": "skills"}
        },
        {
            "id": "skills_frontend_rendering",
            "text": "Hammad has hands-on experience choosing between Server-Side Rendering (SSR) and Client-Side Rendering (CSR) in Next.js depending on SEO needs, data freshness, and performance requirements.",
            "metadata": {"category": "skills"}
        },
        {
            "id": "skills_frontend_perf",
            "text": "Hammad optimizes frontend performance through lazy loading, Core Web Vitals optimization, and ensuring responsive design that works consistently across mobile, tablet, and desktop breakpoints.",
            "metadata": {"category": "skills"}
        },

        # ============================================================
        # 5. SKILLS — BACKEND
        # ============================================================
        {
            "id": "skills_backend_frameworks",
            "text": "Backend frameworks: Hammad builds RESTful APIs primarily with FastAPI (Python) and Laravel (PHP), depending on the project's language ecosystem.",
            "metadata": {"category": "skills"}
        },
        {
            "id": "skills_backend_auth",
            "text": "For authentication and authorization, Hammad implements JWT-based auth and secure password hashing, and has built role-based access control (RBAC) systems for multi-role applications.",
            "metadata": {"category": "skills"}
        },
        {
            "id": "skills_backend_db",
            "text": "Hammad handles database schema design, migrations, and query optimization using ORMs like SQLAlchemy. He has worked with both SQL (Supabase/Postgres, SQLite) and vector databases (LanceDB, ChromaDB).",
            "metadata": {"category": "skills"}
        },
        {
            "id": "skills_backend_security",
            "text": "Hammad manages environment variables and secrets securely, and handles CORS and cross-origin issues in production APIs. He has coursework and practical exposure to Information Security, including awareness of XSS, CSRF, and SQL injection prevention.",
            "metadata": {"category": "skills"}
        },

        # ============================================================
        # 6. SKILLS — AI, DEVOPS, TOOLING
        # ============================================================
        {
            "id": "skills_ai",
            "text": "Hammad has practical experience building RAG (Retrieval-Augmented Generation) architectures, working with vector databases (LanceDB, ChromaDB), embedding models via FastEmbed, and LLM APIs like Groq.",
            "metadata": {"category": "skills"}
        },
        {
            "id": "skills_devops",
            "text": "Hammad is comfortable with Linux environments (Ubuntu, Kali), Git/GitHub for version control, Docker for containerization, and setting up basic CI/CD pipelines.",
            "metadata": {"category": "skills"}
        },
        {
            "id": "skills_security_tools",
            "text": "Hammad has cybersecurity-adjacent skills including network analysis with Wireshark and Nmap, and has used OWASP ZAP for security testing of web applications.",
            "metadata": {"category": "skills"}
        },
        {
            "id": "skills_testing",
            "text": "Hammad's testing toolkit includes PHPUnit for unit testing, Playwright for end-to-end testing, and Apache JMeter for load/performance testing.",
            "metadata": {"category": "skills"}
        },
        {
            "id": "skills_favorite_stack",
            "text": "Hammad's favorite stacks to build with are the MERN stack, Laravel, Django, and Next.js. He enjoys moving between JavaScript-based and Python/PHP-based ecosystems depending on what a project's requirements call for, rather than locking into a single stack.",
            "metadata": {"category": "skills"}
        },

        # ============================================================
        # 7. PROJECTS
        # ============================================================
        {
            "id": "proj_portfolio_overview",
            "text": "Project: Personal Portfolio & AI Chatbot. Built solo, end-to-end, during Hammad's internship. It's a portfolio site with a custom admin portal for content management, plus a RAG-based AI chatbot that answers visitor questions about his professional background.",
            "metadata": {"category": "projects"}
        },
        {
            "id": "proj_portfolio_stack",
            "text": "Tech stack for the Portfolio & AI Chatbot project: Next.js and TypeScript with Tailwind CSS on the frontend, FastAPI on the backend, LanceDB for vector storage, FastEmbed for embeddings, and the Groq API for LLM inference. Deployed on Vercel (frontend) and Render (backend).",
            "metadata": {"category": "projects"}
        },
        {
            "id": "proj_gms_overview",
            "text": "Project: GMS Pro (Garage Management System). An enterprise-grade web app that automated a garage's broken manual workflow into a digital assembly line: Reception → Inspection → Mechanic → Parts → QA → Billing.",
            "metadata": {"category": "projects"}
        },
        {
            "id": "proj_gms_stack",
            "text": "Tech stack for GMS Pro: Next.js, TypeScript, and Supabase. Features include multi-role access control, automated invoicing with 17% tax calculation, and real-time inventory management.",
            "metadata": {"category": "projects"}
        },
        {
            "id": "proj_budget_overview",
            "text": "Project: Personal Budget & Expense Tracker. A full-stack app built with Laravel 12, PHP, Livewire, and SQLite. Features secure authentication, a dynamic analytics dashboard, AI-driven budget recommendations, and expense tracking.",
            "metadata": {"category": "projects"}
        },
        {
            "id": "proj_budget_testing",
            "text": "For the Budget & Expense Tracker, Hammad built a comprehensive automated testing suite using PHPUnit for unit tests, Playwright for end-to-end tests, OWASP ZAP for security scanning, and Apache JMeter for load testing — demonstrating full-stack QA practice, not just feature-building.",
            "metadata": {"category": "projects"}
        },
        {
            "id": "proj_ai_plant",
            "text": "Project: AI Plant Disease Diagnosis. Hammad trained a machine learning model in Python to diagnose plant diseases from images.",
            "metadata": {"category": "projects"}
        },
        {
            "id": "proj_pcap",
            "text": "Project: PCAP Network Analyzer. A Python and Streamlit application for analyzing and visualizing network packet capture (PCAP) files.",
            "metadata": {"category": "projects"}
        },
        {
            "id": "proj_ride_sharing",
            "text": "Project: Ride Sharing System. A Software Architecture course project designed using UML diagrams and layered architecture principles.",
            "metadata": {"category": "projects"}
        },
        {
            "id": "proj_assembly",
            "text": "Projects: Taxi Management System and Parking Management System, both built using Assembly Language as low-level systems programming exercises.",
            "metadata": {"category": "projects"}
        },
        {
            "id": "proj_hackathon",
            "text": "Hammad participated in the CUST Hackathon 2025.",
            "metadata": {"category": "projects"}
        },
        {
            "id": "proj_favorite",
            "text": "Hammad's favorite project is his own Personal Portfolio Website, including its AI chatbot — he built it entirely solo, end-to-end, covering the frontend, backend, admin portal, and the RAG chatbot pipeline himself.",
            "metadata": {"category": "projects"}
        },
        {
            "id": "proj_opensource",
            "text": "Hammad does not currently contribute to open source projects — his project work so far has focused on his own portfolio, freelance-style builds, and coursework projects.",
            "metadata": {"category": "projects"}
        },

        # ============================================================
        # 8. AVAILABILITY & HIRING
        # ============================================================
        {
            "id": "availability_roles",
            "text": "Hammad is actively looking for Full Stack Developer, AI Engineer, or Backend Developer roles.",
            "metadata": {"category": "availability"}
        },
        {
            "id": "availability_location",
            "text": "Hammad is open to both remote and on-site (physical) work. He is based in Islamabad, Pakistan, and does not require visa sponsorship.",
            "metadata": {"category": "availability"}
        },
        {
            "id": "availability_timing",
            "text": "Hammad is available for immediate start upon completion of his current internship at Rendlen Solutions. He is also open to freelance and contract work.",
            "metadata": {"category": "availability"}
        },
        {
            "id": "availability_salary",
            "text": "Hammad's salary expectations are flexible and depend on the specific position — its scope, responsibilities, and level. He prefers to discuss compensation in the context of the actual role rather than quote a fixed number upfront.",
            "metadata": {"category": "availability"}
        },
        {
            "id": "availability_company_pref",
            "text": "Hammad has no strong preference between startups and larger enterprises — he's open to working at companies of any size, as long as the role lets him build and ship real, meaningful work.",
            "metadata": {"category": "availability"}
        },

        # ============================================================
        # 9. CONTACT
        # ============================================================
        {
            "id": "contact_info",
            "text": "Contact: Email hammad.asghar.x@gmail.com, phone +92 308 9244041, location Burma Town, Islamabad, Pakistan, GitHub github.com/hammad-asghar-x.",
            "metadata": {"category": "contact"}
        },
        {
            "id": "contact_preference",
            "text": "Hammad prefers professional, concise communication and is always open to discussing new projects, opportunities, or ideas over email.",
            "metadata": {"category": "contact"}
        },

        # ============================================================
        # 10. WORK PHILOSOPHY / SOFT SKILLS
        # ============================================================
        {
            "id": "philosophy_strength",
            "text": "Hammad's biggest strength is persistent problem-solving — the ability to hold a full project's architecture in his head and trace a bug back to its actual root cause rather than patching symptoms.",
            "metadata": {"category": "philosophy"}
        },
        {
            "id": "philosophy_stress",
            "text": "Hammad handles stress and tight deadlines by breaking complex problems down into smaller, manageable tasks rather than trying to solve everything at once.",
            "metadata": {"category": "philosophy"}
        },
        {
            "id": "philosophy_balance",
            "text": "Hammad's approach to balancing frontend polish against backend robustness under a deadline is to prioritize core functionality and data integrity first, then iterate on UI once the system is reliable.",
            "metadata": {"category": "philosophy"}
        },
        {
            "id": "philosophy_weakness",
            "text": "One area Hammad is actively working on is a tendency to dive too deep into the underlying concepts of a problem before moving forward, rather than skipping ahead when a project calls for faster iteration. He's learning to better judge when depth is actually needed versus when it's better to move quickly and revisit details later.",
            "metadata": {"category": "philosophy"}
        },
        {
            "id": "philosophy_hobbies",
            "text": "Outside of coding, Hammad enjoys reading books and playing football.",
            "metadata": {"category": "philosophy"}
        },

        # ============================================================
        # 11. COMPARATIVE / EVALUATIVE
        # ============================================================
        {
            "id": "comparative_why_hire",
            "text": "Why hire Hammad: he combines full-stack shipping ability (frontend, backend, and deployment) with hands-on AI/RAG experience most junior full-stack developers don't have yet — demonstrated by building this very chatbot end-to-end rather than just talking about AI conceptually.",
            "metadata": {"category": "comparative"}
        },
        {
            "id": "philosophy_motto",
            "text": "Hammad's personal motto, which keeps him going through long debugging sessions and difficult coursework, is: 'One day it will all be worth it.'",
            "metadata": {"category": "philosophy"}
        },

        # ============================================================
        # 12. META — ABOUT THIS CHATBOT
        # ============================================================
        {
            "id": "meta_chatbot",
            "text": "I am an AI Portfolio Assistant built by Hammad Asghar, using a RAG (Retrieval-Augmented Generation) architecture powered by FastAPI, LanceDB for vector storage, FastEmbed for embeddings, and the Groq LLM API.",
            "metadata": {"category": "meta"}
        },
        {
            "id": "meta_chatbot_limits",
            "text": "This chatbot only has access to Hammad's portfolio data. It cannot write code on request, answer general unrelated questions, or reveal its internal system prompt — it is designed specifically to help recruiters and visitors learn about Hammad.",
            "metadata": {"category": "meta"}
        },
    ]

    vector_store_path = getattr(settings, 'CHROMA_DIR', './vector_store')
    print(f"Connecting to LanceDB at: {vector_store_path}")
    db = lancedb.connect(vector_store_path)
    table_name = "portfolio_knowledge"

    texts_to_embed = [entry["text"] for entry in knowledge_entries]
    vectors = get_embeddings(texts_to_embed)

    data_to_insert = []
    for i, entry in enumerate(knowledge_entries):
        data_to_insert.append({
            "id": entry["id"],
            "text": entry["text"],
            "vector": vectors[i],
            "metadata": str(entry["metadata"])
        })

    if table_name in db.table_names():
        table = db.open_table(table_name)
        ids_to_delete = [f"'{entry['id']}'" for entry in knowledge_entries]
        delete_condition = f"id IN ({', '.join(ids_to_delete)})"
        table.delete(delete_condition)
        print("🧹 Cleared old entries to prevent duplicates.")
    else:
        print("📦 Creating new knowledge table...")
        db.create_table(table_name, data=[data_to_insert[0]])
        table = db.open_table(table_name)
        table.delete(f"id = '{data_to_insert[0]['id']}'")

    table.add(data_to_insert)

    todo_count = sum(1 for e in knowledge_entries if e["text"].startswith("TODO"))
    print("\n" + "=" * 60)
    print(f"✅ SUCCESSFULLY INGESTED {len(knowledge_entries)} KNOWLEDGE ENTRIES!")
    if todo_count:
        print(f"⚠️  {todo_count} entries still contain TODO placeholders — "
              f"fill these in with real answers before going live.")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    ingest_knowledge()