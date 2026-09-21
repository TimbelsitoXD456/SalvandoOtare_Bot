# 🚀 Generador de Prompts Inteligente

**Antes:** SalvandoOtare Bot era un asistente de IA específico.  
**Ahora:** Una plataforma inteligente que genera prompts optimizados para cualquier modelo de IA.

## ✨ Características

### 🎯 Selección Inteligente
- **6 Modelos de IA**: ChatGPT, Google Gemini, Claude, Groq, Meta IA (Llama), Canva IA
- **3 Planes**: Free, Pro, Premium (con características y límites específicos)
- **6 Tipos de Tareas**: Creativo, Técnico, Académico, Negocios, Análisis, Redacción

### 🔧 Generación Optimizada
- Cada modelo recibe un prompt diseñado específicamente para sus fortalezas
- Los planes determinan el nivel de detalle y complejidad
- El motor de Gemini 2.0 Flash genera prompts en tiempo real

### 💻 Interfaz Moderna
- Diseño profesional con tema dark moderno
- Panel de configuración intuitivo
- Visualización clara del prompt generado
- Botón "Copiar al portapapeles" integrado
- Indicadores de carga y manejo de errores

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────┐
│         Frontend (HTML/CSS/JS)          │
│  - Selectores modelo, plan, tipo        │
│  - Input para descripción de tarea      │
│  - Visualización de prompt generado     │
└────────────────┬────────────────────────┘
                 │ API POST /ask
                 ▼
┌─────────────────────────────────────────┐
│    Netlify Function (ask.js)            │
│  - Valida inputs                        │
│  - Carga configuración de modelos       │
│  - Construye system prompt optimizado   │
│  - Llama Gemini 2.0 Flash               │
└────────────────┬────────────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │   Gemini API  │
         │  Genera Prompt│
         └───────────────┘
```

## 📦 Archivos Principales

### Frontend
- **`index.html`** - Nueva estructura con selectores de modelo/plan
- **`style.css`** - Tema profesional moderno
- **`main.js`** - Lógica de generación, validación y UX

### Backend
- **`netlify/functions/ask.js`** - Función principal que genera prompts
- **`netlify/functions/models-config.js`** - Configuración de modelos y planes

### Configuración
- **`.env.example`** - Variables de entorno requeridas
- **`.netlify.toml`** - Configuración de Netlify (si existe)

## 🚀 Cómo Usar

### 1. Configuración Inicial

```bash
# Clona o descarga el proyecto
cd SalvandoOtare_Bot

# Copia el archivo de configuración
cp .env.example .env

# Edita .env con tu API Key de Gemini
GEMINI_API_KEYY=tu_api_key_aqui
```

### 2. Obtener API Key de Gemini

1. Visita [Google AI Studio](https://ai.google.dev/)
2. Obtén tu API Key (es gratis)
3. Configura la variable de entorno `GEMINI_API_KEYY`

### 3. Usar la Plataforma

1. **Selecciona un modelo de IA** (ej: ChatGPT, Gemini, Claude)
2. **Elige tu plan** (Free, Pro, Premium)
3. **Selecciona el tipo de tarea** (Creativo, Técnico, Académico, etc.)
4. **Describe tu tarea** en el area de texto
5. **Presiona "Generar Prompt"**
6. **Copia el prompt generado** y úsalo en tu modelo de IA favorito

## 🎯 Ejemplos

### Ejemplo 1: Generar Prompt para ChatGPT (Plan Pro)
- **Modelo:** ChatGPT
- **Plan:** Pro
- **Tipo:** Creativo
- **Tarea:** "Quiero que ChatGPT me ayude a escribir una novela de misterio"

**Resultado:** Un prompt detallado y estructurado optimizado para ChatGPT

### Ejemplo 2: Generar Prompt para Claude (Plan Premium)
- **Modelo:** Claude
- **Plan:** Premium
- **Tipo:** Técnico
- **Tarea:** "Necesito un prompt para crear un analizador de código en Python"

**Resultado:** Un prompt muy completo con ejemplos y edge cases

## 🔧 Características de Planes

### Plan FREE
- ⏱️ Prompts conciso y directo (max 500 tokens)
- 📝 Formato simple
- ✅ Perfecto para tareas básicas

### Plan PRO
- 📚 Prompts detallados con ejemplos (max 2000 tokens)
- 🎯 Contexto abundante
- ✅ Ideal para la mayoría de tareas

### Plan PREMIUM
- 🚀 Prompts exhaustivos con edge cases (max 4000 tokens)
- 🧠 Razonamiento profundo
- 📊 Análisis multi-perspectiva
- ✅ Para proyectos complejos

## 🤖 Modelos Soportados

| Modelo | Versión | Fortaleza | Mejor Para |
|--------|---------|-----------|-----------|
| **ChatGPT** | GPT-4/3.5 | Versatilidad general | Todo tipo de tareas |
| **Gemini** | 2.0/Pro | Análisis multimodal | Análisis y datos |
| **Claude** | 3 Opus/Sonnet | Razonamiento profundo | Análisis complejos |
| **Groq** | Mixtral | Velocidad | Tareas urgentes |
| **Meta IA** | Llama 3.1 | Eficiencia | Código y técnico |
| **Canva IA** | Magic Design | Diseño visual | Creatividad visual |

## 🛠️ Desarrollo

### Agregar un Nuevo Modelo

Edita `netlify/functions/models-config.js`:

```javascript
nuevoModelo: {
  nombre: 'Nuevo Modelo',
  version: '1.0',
  características: {
    free: { maxTokens: 500, estilo: '...', instrucciones: '...' },
    pro: { maxTokens: 2000, estilo: '...', instrucciones: '...' },
    premium: { maxTokens: 4000, estilo: '...', instrucciones: '...' }
  },
  guidelines: 'Características del modelo...'
}
```

## 📊 Flujo de Datos

```
Usuario selecciona (modelo, plan, tipo, descripción)
    ↓
Frontend valida inputs
    ↓
POST a /.netlify/functions/ask
    ↓
Backend carga configuración del modelo
    ↓
Backend construye system prompt optimizado
    ↓
Backend llama Gemini 2.0 Flash
    ↓
Gemini genera prompt optimizado
    ↓
Backend devuelve prompt
    ↓
Frontend muestra prompt y botón de copiar
    ↓
Usuario copia y usa en su modelo de IA favorito
```

## 🐛 Troubleshooting

### "API Key no configurada"
- Verifica que `.env` tenga `GEMINI_API_KEYY` (con 2 Ys)
- Asegúrate que la variable esté en el entorno de Netlify

### "Modelo no soportado"
- Verifica el nombre del modelo en `models-config.js`
- Asegúrate de usar los valores exactos

### "Prompt no se genera"
- Chequea que todos los campos estén completos
- Verifica que Gemini API esté activa y accesible
- Revisa los logs de Netlify para más detalles

## 📝 Notas Técnicas

- **Motor:** Gemini 2.0 Flash (rápido y económico)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Netlify Functions (serverless)
- **API:** Google Generative AI API v1beta

## 🎓 Casos de Uso

- 📖 Generar prompts para escritura creativa
- 💻 Crear prompts para coding assistance
- 📚 Prompts para tutorías académicas
- 💼 Prompts para análisis empresarial
- 🎨 Prompts para diseño con Canva IA
- 🔍 Prompts para investigación y análisis

## 🚀 Próximas Mejoras

- [ ] Guardar prompts generados en historial
- [ ] Exportar en diferentes formatos (JSON, Markdown)
- [ ] Editor visual de prompts
- [ ] Integración con APIs de modelos (OpenAI, Anthropic, etc.)
- [ ] Plantillas personalizadas
- [ ] Sistema de rating para prompts

## 📄 Licencia

Este proyecto es parte del portfolio de SalvandoOtare Bot.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, crea un pull request con tus mejoras.

---

**¡Haz que generar prompts sea fácil, rápido e inteligente!** ✨
