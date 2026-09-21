// Configuración de modelos de IA y sus características

const modelsConfig = {
  chatgpt: {
    nombre: 'ChatGPT (OpenAI)',
    version: 'GPT-4/3.5-Turbo',
    características: {
      free: {
        maxTokens: 500,
        estilo: 'profesional y accesible',
        instrucciones: 'Crea un prompt claro, directo y conciso'
      },
      pro: {
        maxTokens: 2000,
        estilo: 'detallado y bien estructurado',
        instrucciones: 'Crea un prompt detallado con múltiples ejemplos y contexto'
      },
      premium: {
        maxTokens: 4000,
        estilo: 'muy complejo con ejemplos y chain-of-thought',
        instrucciones: 'Crea un prompt extremadamente detallado con COT, ejemplos variados y edge cases'
      }
    },
    guidelines: 'ChatGPT responde mejor con instrucciones claras, ejemplos específicos, y formato estructurado'
  },

  gemini: {
    nombre: 'Google Gemini',
    version: '2.0/Pro',
    características: {
      free: {
        maxTokens: 500,
        estilo: 'simple y directo',
        instrucciones: 'Crea un prompt conciso y enfocado'
      },
      pro: {
        maxTokens: 2000,
        estilo: 'detallado con ejemplos',
        instrucciones: 'Crea un prompt con ejemplos específicos y contexto'
      },
      premium: {
        maxTokens: 4000,
        estilo: 'muy detallado con múltiples perspectivas',
        instrucciones: 'Crea un prompt con análisis profundo, ejemplos múltiples y perspectivas variadas'
      }
    },
    guidelines: 'Gemini trabaja bien con prompts que incluyen contexto claro y ejemplos de entrada/salida'
  },

  claude: {
    nombre: 'Claude (Anthropic)',
    version: '3 Opus/Sonnet/Haiku',
    características: {
      free: {
        maxTokens: 500,
        estilo: 'natural y conversacional',
        instrucciones: 'Crea un prompt en tono conversacional y accesible'
      },
      pro: {
        maxTokens: 2000,
        estilo: 'estructurado con contexto',
        instrucciones: 'Crea un prompt bien estructurado con contexto y ejemplos claros'
      },
      premium: {
        maxTokens: 4000,
        estilo: 'muy sofisticado con reasoning',
        instrucciones: 'Crea un prompt que invite al razonamiento profundo con ejemplos sofisticados'
      }
    },
    guidelines: 'Claude responde bien a prompts que incluyen razonamiento explícito y referencias a su propia sección de pensamiento'
  },

  groq: {
    nombre: 'Groq',
    version: 'Mixtral',
    características: {
      free: {
        maxTokens: 400,
        estilo: 'directo y eficiente',
        instrucciones: 'Crea un prompt conciso y optimizado para velocidad'
      },
      pro: {
        maxTokens: 1500,
        estilo: 'eficiente pero detallado',
        instrucciones: 'Crea un prompt eficiente pero con suficiente contexto'
      },
      premium: {
        maxTokens: 3000,
        estilo: 'completo pero optimizado',
        instrucciones: 'Crea un prompt completo optimizado para mejor calidad sin perder eficiencia'
      }
    },
    guidelines: 'Groq es rápido pero requiere prompts bien definidos. Evita ambigüedades'
  },

  meta: {
    nombre: 'Meta IA (Llama)',
    version: '3 / 3.1',
    características: {
      free: {
        maxTokens: 500,
        estilo: 'claro y funcional',
        instrucciones: 'Crea un prompt claro con instrucciones precisas'
      },
      pro: {
        maxTokens: 2000,
        estilo: 'detallado con buenos ejemplos',
        instrucciones: 'Crea un prompt con ejemplos específicos y detalles'
      },
      premium: {
        maxTokens: 4000,
        estilo: 'muy completo con edge cases',
        instrucciones: 'Crea un prompt exhaustivo con consideraciones de edge cases'
      }
    },
    guidelines: 'Llama funciona mejor con prompts estructurados y ejemplos claros de entrada/salida'
  },

  canva: {
    nombre: 'Canva IA',
    version: 'Magic Design',
    características: {
      free: {
        maxTokens: 400,
        estilo: 'visual y simple',
        instrucciones: 'Crea un prompt enfocado en descripción visual y diseño'
      },
      pro: {
        maxTokens: 1500,
        estilo: 'visual detallado',
        instrucciones: 'Crea un prompt con especificaciones visuales detalladas y estilos'
      },
      premium: {
        maxTokens: 3000,
        estilo: 'muy visual con especificaciones técnicas',
        instrucciones: 'Crea un prompt muy detallado con especificaciones visuales y técnicas precisas'
      }
    },
    guidelines: 'Canva AI es diseño-centric. Incluye colores, estilos, elementos visuales específicos'
  }
};

// Tipos de tareas soportados
const tiposTarea = {
  creativo: {
    label: '🎨 Creativo',
    ejemplos: ['Historias', 'Poesía', 'Brainstorming', 'Ideación'],
    enfoque: 'creatividad y originalidad'
  },
  tecnico: {
    label: '💻 Técnico / Código',
    ejemplos: ['Python', 'JavaScript', 'SQL', 'Debuggear'],
    enfoque: 'precisión técnica y eficiencia'
  },
  academico: {
    label: '📚 Académico',
    ejemplos: ['Ensayos', 'Investigación', 'Explicaciones', 'Análisis'],
    enfoque: 'rigor académico y estructura'
  },
  negocios: {
    label: '💼 Negocios',
    ejemplos: ['Estrategia', 'Marketing', 'Planes', 'Análisis'],
    enfoque: 'valor comercial y ROI'
  },
  analisis: {
    label: '📊 Análisis / Investigación',
    ejemplos: ['Data', 'Tendencias', 'Investigación', 'Insights'],
    enfoque: 'profundidad analítica y evidencia'
  },
  redaccion: {
    label: '✍️ Redacción / Contenido',
    ejemplos: ['Blogs', 'Copys', 'Artículos', 'Redes sociales'],
    enfoque: 'claridad y engagement'
  }
};

module.exports = { modelsConfig, tiposTarea };
