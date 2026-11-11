const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const toast=(msg)=>{const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove('show'),1800)};

$$('.nav-item').forEach(btn=>btn.addEventListener('click',()=>{$$('.nav-item').forEach(x=>x.classList.remove('active'));btn.classList.add('active');toast(`${btn.textContent.trim()}模块已切换`)}));
$$('.paper-item').forEach(btn=>btn.addEventListener('click',()=>{$$('.paper-item').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('#tabTitle').textContent=btn.dataset.title;toast('论文已载入阅读器')}));

let zoom=100;
const updateZoom=()=>{$('#zoomLabel').textContent=zoom+'%';$('#paperPage').style.transform=`scale(${zoom/100})`;$('#paperPage').style.marginBottom=`${Math.max(0,(zoom-100)*7.8)}px`};
$('#zoomIn').addEventListener('click',()=>{zoom=Math.min(140,zoom+10);updateZoom()});
$('#zoomOut').addEventListener('click',()=>{zoom=Math.max(70,zoom-10);updateZoom()});
$$('.tool').forEach(btn=>btn.addEventListener('click',()=>{$$('.tool').forEach(x=>x.classList.remove('active'));btn.classList.add('active');toast(`已启用${btn.title||'工具'}`)}));

$('#term').addEventListener('click',()=>{$('#translation').hidden=!$('#translation').hidden});

const guideData={
  overview:[['▰','论文速览','提出多模态基础模型的研究，旨在统一视觉、语言等多种模态的表示与理解。'],['◎','研究问题','如何构建统一的多模态基础模型，实现跨模态知识迁移？'],['✿','方法思路','基于 Transformer 架构，使用大规模多模态数据进行联合预训练。'],['⌁','主要结果','在多项多模态任务上达到领先水平，并展示出较强的泛化能力。']],
  summary:[['✦','一句话总结','统一编码多种模态，并通过组合训练目标获得通用的理解、生成与推理能力。'],['▰','核心贡献','提出可扩展的共享表示空间与统一训练范式。'],['◎','适用场景','视觉问答、跨模态检索、内容生成与复杂推理。']],
  method:[['✿','模型架构','采用 Transformer 主干网络与模态专属编码器。'],['▱','训练数据','混合大规模图像、文本和音频配对数据。'],['⌁','训练目标','结合自监督学习、对比学习与指令微调。']],
  conclusion:[['✓','性能结论','多项基准任务取得领先或具有竞争力的结果。'],['↗','泛化能力','在零样本与少样本场景下保持较强表现。'],['!','研究边界','数据偏差、训练成本与可解释性仍需进一步研究。']],
  ideas:[['?','可探索问题','能否用更少配对数据实现稳定的跨模态对齐？'],['✦','实验灵感','比较不同模态融合层级对推理性能的影响。'],['↗','延伸方向','面向专业科研场景加入领域知识与可信度校准。']]
};
function renderGuide(key){$('#guideContent').innerHTML=guideData[key].map((x,i)=>`<div class="timeline-item"><i class="${['blue','red','cyan','orange'][i%4]}">${x[0]}</i><div><b>${x[1]}</b><p>${x[2]}</p></div></div>`).join('')}
$$('[data-guide]').forEach(btn=>btn.addEventListener('click',()=>{$$('[data-guide]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderGuide(btn.dataset.guide)}));
$('#generateGuide').addEventListener('click',e=>{e.currentTarget.textContent='✦ 生成中…';e.currentTarget.disabled=true;setTimeout(()=>{renderGuide('overview');e.currentTarget.textContent='✓ 已生成';toast('AI 导览已根据当前论文生成');setTimeout(()=>{e.currentTarget.textContent='＋ 一键生成';e.currentTarget.disabled=false},1800)},850)});

const note=$('#noteEditor');
const stored=localStorage.getItem('research-note');if(stored)note.innerHTML=stored;
note.addEventListener('input',()=>{localStorage.setItem('research-note',note.innerHTML);toast('笔记已自动保存')});
$('#exportNote').addEventListener('click',()=>{const blob=new Blob([note.innerText],{type:'text/plain;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='科研阅读笔记.txt';a.click();URL.revokeObjectURL(a.href);toast('笔记已导出')});
$('#addTag').addEventListener('click',()=>{const tag=prompt('输入新标签');if(tag){const b=document.createElement('button');b.textContent='# '+tag;$('#addTag').before(b);toast('标签已添加')}});
$('#addFolder').addEventListener('click',()=>toast('新建文件夹功能已就绪'));
$('#globalSearch').addEventListener('keydown',e=>{if(e.key==='Enter')toast(`正在搜索“${e.currentTarget.value}”`)});
$('#pageInput').addEventListener('change',e=>{const n=Math.max(1,Math.min(24,Number(e.currentTarget.value)||1));e.currentTarget.value=n;toast(`已跳转到第 ${n} 页`)});
