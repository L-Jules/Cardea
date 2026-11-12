from PIL import Image
import os

# Dossiers
input_dir = "./pions/x1"
output_dir = "./pions/x3"

# Création du dossier de sortie s'il existe pas
os.makedirs(output_dir, exist_ok=True)

# Boucle sur toutes les images du dossier
for filename in ["its fine.png"]:
    if filename.lower().endswith((".png")):
        path_in = os.path.join(input_dir, filename)
        path_out = os.path.join(output_dir, filename)

        # Ouvre l'image
        img = Image.open(path_in)

        # Double la taille (important: NE PAS lisser → garder le pixel art)
        w, h = img.size
        img_resized = img.resize((w * 3, h * 3), Image.NEAREST)

        # Sauvegarde
        img_resized.save(path_out)
        print(f"→ {filename} agrandie x2")

print("Tout est fini, chef. Les images sont dans le dossier 'x2' 😎")
