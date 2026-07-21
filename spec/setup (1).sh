#!/bin/bash
# setup.sh — Medianeras Web · Inicialización del proyecto
# Harvi Digital · Harvestech S.R.L.

set -e

echo ""
echo "=================================="
echo "  medianeras web — setup inicial"
echo "  Harvi Digital"
echo "=================================="
echo ""

# 1. Verificar Node
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "❌ Necesitás Node.js 20 o superior (tenés v$NODE_VERSION)"
  exit 1
fi
echo "✅ Node.js $(node -v)"

# 2. Instalar pnpm si no está
if ! command -v pnpm &> /dev/null; then
  echo "📦 Instalando pnpm..."
  npm install -g pnpm
fi
echo "✅ pnpm $(pnpm -v)"

# 3. Crear proyecto Astro
echo ""
echo "🚀 Creando proyecto Astro..."
pnpm create astro@latest . \
  --template minimal \
  --typescript strict \
  --no-git \
  --no-install

# 4. Instalar dependencias del frontend
echo ""
echo "📦 Instalando dependencias frontend..."
pnpm install

# Dependencias de producción
pnpm add \
  @astrojs/node \
  astro-seo

# 5. Copiar archivos del proyecto
echo ""
echo "📁 Copiando estructura del proyecto..."

# Mover archivos SDD a su lugar
mkdir -p src/styles src/lib src/components src/layouts src/content mock cms

# Copiar skills al proyecto
mkdir -p skills
cp -r skills/ skills/

# .env de desarrollo
if [ ! -f .env.development ]; then
cat > .env.development << 'EOF'
USE_MOCK=true
CMS_URL=http://localhost:3001
PUBLIC_GOOGLE_MAPS_KEY=
PUBLIC_GA_ID=
EOF
echo "✅ .env.development creado"
fi

# .env de producción (template vacío)
if [ ! -f .env.production ]; then
cat > .env.production << 'EOF'
USE_MOCK=false
CMS_URL=https://cms.medianeras.com.ar
PUBLIC_GOOGLE_MAPS_KEY=
PUBLIC_GA_ID=
EOF
echo "✅ .env.production creado (completar variables)"
fi

# .gitignore
cat > .gitignore << 'EOF'
node_modules/
dist/
.env
.env.production
.env.local
.DS_Store
.astro/
EOF

# 6. Crear imágenes placeholder para mock
echo ""
echo "🖼️  Creando placeholders de imágenes mock..."
mkdir -p public/mock/fotos

PLACEHOLDERS=(frente interior valentina lucia laura martin sofia paula)
for name in "${PLACEHOLDERS[@]}"; do
  if [ ! -f "public/mock/fotos/${name}.jpg" ]; then
    curl -s "https://placehold.co/400x400/29484C/FBF5EC?text=${name}" \
      -o "public/mock/fotos/${name}.jpg" 2>/dev/null || \
      echo "  ⚠️  No se pudo descargar placeholder para ${name} (sin internet)"
  fi
done

# 7. Inicializar Payload CMS
echo ""
echo "🗄️  Inicializando Payload CMS..."
mkdir -p cms
cd cms

if [ ! -f package.json ]; then
  pnpm init -y
  pnpm add payload @payloadcms/db-postgres @payloadcms/richtext-lexical express
  pnpm add -D typescript @types/node ts-node
fi

cd ..

echo ""
echo "==========================================="
echo "✅ Setup completo."
echo ""
echo "Para iniciar desarrollo:"
echo ""
echo "   pnpm dev           ← frontend Astro"
echo "   cd cms && pnpm dev ← panel CMS Payload"
echo ""
echo "📚 Documentos del proyecto:"
echo "   AGENTS.md       → Contexto para agentes de código"
echo "   REQUIREMENTS.md → Qué hay que construir"
echo "   SPEC.md         → Cómo construirlo"
echo ""
echo "🧠 Skills para Claude Code:"
echo "   skills/medianeras-brand/SKILL.md"
echo "   skills/medianeras-content/SKILL.md"
echo "   skills/medianeras-cms/SKILL.md"
echo ""
echo "⚠️  Antes de lanzar en producción:"
echo "   1. Completar .env.production con URLs y keys reales"
echo "   2. Reemplazar imágenes en /public/mock/fotos/ con fotos reales"
echo "   3. Actualizar mock/config.ts con dirección y coordenadas reales"
echo "==========================================="
