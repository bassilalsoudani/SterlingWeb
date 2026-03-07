import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace <style> block
style_pattern = re.compile(r'<style>.*?</style>', re.DOTALL)
html = style_pattern.sub('<link rel="stylesheet" href="style.css">', html)

# Replace <script> block at bottom
script_pattern = re.compile(r'<script>\s*// Mobile Menu Toggle.*?</script>', re.DOTALL)
html = script_pattern.sub('<script src="main.js" defer></script>', html)

# Add reveal classes to specific grid classes and divs
# Find hero text
html = html.replace('<div class="z-10">', '<div class="z-10 reveal">')
html = html.replace('<div class="relative group">', '<div class="relative group reveal delay-200">')

# Find positioning
html = html.replace('<div class="max-w-5xl mx-auto px-6 text-center">', '<div class="max-w-5xl mx-auto px-6 text-center reveal">')

# Find problems
html = html.replace('<div class="bg-white p-12 md:p-20">', '<div class="bg-white p-12 md:p-20 reveal">')
html = html.replace('<div class="bg-primary p-12 md:p-20 text-white">', '<div class="bg-primary p-12 md:p-20 text-white reveal delay-200">')

# Services
html = html.replace('<div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">', '<div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 reveal">')
html = html.replace('<div class="bg-white p-8 border border-primary/5 hover:border-accent/50 transition-colors flex flex-col justify-between h-80">', '<div class="bg-white p-8 border border-primary/5 hover:border-accent/50 transition-colors flex flex-col justify-between h-80 reveal block">')

# Why Sterling Web
html = html.replace('<div class="lg:col-span-5">', '<div class="lg:col-span-5 reveal">')
html = html.replace('<div class="lg:col-span-7">', '<div class="lg:col-span-7 reveal delay-200">')

# Process
html = html.replace('<h2 class="text-4xl md:text-5xl font-black text-primary mb-20 text-center uppercase tracking-tighter">', '<h2 class="text-4xl md:text-5xl font-black text-primary mb-20 text-center uppercase tracking-tighter reveal">')
html = html.replace('<div class="bg-slate-50 p-10 group hover:bg-white transition-all">', '<div class="bg-slate-50 p-10 group hover:bg-white transition-all reveal">')

# Example Concepts
html = html.replace('<div class="space-y-6">', '<div class="space-y-6 reveal">')
html = html.replace('<div class="space-y-6 pt-12">', '<div class="space-y-6 pt-12 reveal delay-200">')

# FAQ
html = html.replace('<h2 class="text-4xl font-black text-primary mb-16 text-center">', '<h2 class="text-4xl font-black text-primary mb-16 text-center reveal">')
html = html.replace('<div class="space-y-4">', '<div class="space-y-4 reveal delay-200">')

# Final CTA & Form
html = html.replace('<div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">', '<div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center reveal">')


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
