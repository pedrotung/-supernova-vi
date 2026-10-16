import sys,os,re
S=sys.argv[1];L=lambda n:open(f'{S}/logo/{n}.svg').read().strip()
base=open(f'{S}/src/base.css').read();hdr=open(f'{S}/src/header.html').read();ftr=open(f'{S}/src/footer.html').read()
rev=L('icon-standard-reversed');cls=iter(['fr','st','co'])
rev=re.sub(r'<path ',lambda m:f'<path class="{next(cls)}" ',rev)
cfg={'a':('lockup-simplified-positive','btn-solid'),'b':('lockup-simplified-reversed','btn-yellow'),'c':('lockup-simplified-positive','btn-solid')}
for k,(logo,btn) in cfg.items():
    s=open(f'{S}/src/{k}.html').read()
    h=hdr.replace('{{HDR_LOGO}}',L(logo)).replace('{{HDR_BTN}}',btn)
    s=s.replace('{{BASE_CSS}}',base).replace('{{HEADER}}',h).replace('{{FOOTER}}',ftr)
    s=s.replace('{{LOGO_STD_REV}}',L('lockup-standard-reversed')).replace('{{LOGO_STD_POS}}',L('lockup-standard-positive')).replace('{{ICON_POS}}',L('icon-standard-positive')).replace('{{ICON_REV_PARTS}}',rev)
    assert '{{' not in s,(k,re.findall(r'\{\{\w+\}\}',s))
    names={'a':'supernova-home-a-pixel-field','b':'supernova-home-b-nova-burst','c':'supernova-home-c-pixel-bento'}
    open(f'{S}/out/{names[k]}.html','w').write(s);print(k,len(s))
