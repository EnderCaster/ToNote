rm -rf dist
rm -f index_prod.html
npm run build
rm -rf /d/serve_root/2note/*
cp -r dist /d/serve_root/2note/dist
cp index_prod.html /d/serve_root/2note/index.html