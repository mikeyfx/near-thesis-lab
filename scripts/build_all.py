"""One command for both network and verified-source economics snapshots."""
import subprocess,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
for script in ['build.py','build_protocol.py']:
    subprocess.run([sys.executable,str(root/'scripts'/script)],cwd=root,check=True)
