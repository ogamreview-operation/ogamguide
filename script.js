// ─── Navigation ───
const navItems = document.querySelectorAll('.nav-item[data-section]');
const sections = document.querySelectorAll('.section');

function showSection(id) {
  sections.forEach(s => s.classList.toggle('active', s.id === id));
  navItems.forEach(n => n.classList.toggle('active', n.dataset.section === id));
  window.scrollTo({ top: 0, behavior: 'instant' });
  closeSidebar();
}

navItems.forEach(item => {
  item.addEventListener('click', () => showSection(item.dataset.section));
});

// Default section
showSection('home');

// ─── Search ───
const searchData = [
  { title: '오감리뷰 광고 소개서', desc: '오감리뷰 서비스 전체 소개 PDF', section: 'intro' },
  { title: '어드민 활용 가이드', desc: '오로라 어드민 등록 및 활용 방법', section: 'admin-guide' },
  { title: 'PRO 상품 소개', desc: 'Top 크리에이터, 단가, 기대효과', section: 'pro' },
  { title: 'PRO 단가', desc: '5명 150만원 ~ 30명 650만원', section: 'pro' },
  { title: '인스타그램 원브랜드 콘텐츠', desc: '부가광고상품 – 1,000만원, 팔로워 130만', section: 'addon' },
  { title: '오감의 아이템 (원브랜드 콘텐츠)', desc: '부가광고상품 – 300만원, 상세페이지 유입 654%↑', section: 'addon' },
  { title: 'OGAM LIST', desc: '부가광고상품 – 100만원, 아카이빙형 콘텐츠', section: 'addon' },
  { title: 'ROOKIE 상품 소개', desc: '내부 선별 크리에이터, 1인당 5만원', section: 'rookie' },
  { title: 'ROOKIE 단가', desc: '최소 5인 25만원 ~ 최대 50인 250만원', section: 'rookie' },
  { title: '진행 프로세스', desc: '오감리뷰 전체 진행 일정 및 세부 프로세스', section: 'process' },
  { title: '콘텐츠 예시', desc: '프로/루키 카테고리별 콘텐츠 링크', section: 'examples' },
  { title: 'FAQ – 체험단 신청', desc: '신청 방법, 인원, 카테고리 제한 등', section: 'faq' },
  { title: 'FAQ – 라이선스', desc: '2차 라이선스 활용 정책 및 절차', section: 'faq' },
  { title: 'FAQ – 광고 안내', desc: '영상 리뷰, 회차 중복 진행 등', section: 'faq' },
  { title: '2차 라이선스 정책', desc: '이미지 활용 범위, 출처 기재, 불가 사항', section: 'faq' },
  { title: '2차 라이선스 활용 신청', desc: '루키/프로 라이선스 구글폼 신청', section: 'license' },
  { title: '오로라 어드민 접속', desc: 'https://orora.ohou.se/', section: 'process' },
  { title: '카카오톡 문의', desc: '오감리뷰 실무 관련 문의 채널', section: 'home' },
];

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.classList.remove('show'); return; }

  const hits = searchData.filter(d =>
    d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q)
  );

  if (hits.length === 0) {
    searchResults.innerHTML = `<div class="search-result-empty">검색 결과가 없습니다.</div>`;
  } else {
    searchResults.innerHTML = hits.map(h => `
      <div class="search-result-item" data-section="${h.section}">
        <div class="search-result-title">${highlight(h.title, q)}</div>
        <div class="search-result-desc">${highlight(h.desc, q)}</div>
      </div>
    `).join('');

    searchResults.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', () => {
        showSection(el.dataset.section);
        searchInput.value = '';
        searchResults.classList.remove('show');
      });
    });
  }

  searchResults.classList.add('show');
});

function highlight(text, q) {
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrap')) {
    searchResults.classList.remove('show');
  }
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    searchResults.classList.remove('show');
    searchInput.blur();
  }
});

// ─── FAQ ───
const faqTabs = document.querySelectorAll('.faq-tab');
const faqLists = document.querySelectorAll('.faq-list');

faqTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    faqTabs.forEach(t => t.classList.remove('active'));
    faqLists.forEach(l => l.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    // Close all in same list
    btn.closest('.faq-list').querySelectorAll('.faq-question').forEach(b => {
      b.classList.remove('open');
      b.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      btn.classList.add('open');
      answer.classList.add('open');
    }
  });
});

// ─── Mobile Sidebar ───
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');
const menuBtn = document.getElementById('menuBtn');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
});

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

overlay.addEventListener('click', closeSidebar);

// ─── Copy Buttons ───
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.copy;
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      const origTitle = btn.title;
      btn.title = '복사됨!';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.title = origTitle;
      }, 1800);
    }).catch(() => {
      // fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 1800);
    });
  });
});

// ─── Top Button ───
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });

// ─── Lightbox ───
function openLightbox(src, alt) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = src;
  img.alt = alt || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ─── TOC anchor scroll (account for fixed header) ───
document.querySelectorAll('.toc-item').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 56;
    const offset = headerH + 20;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── Schedule Calendars ───
const CAL_EVENTS = {
  mar: {
    months: [[2026,2],[2026,3],[2026,4]],
    events: [
      { label: '제품 등록 기간',            short: '제품 등록',     start: [2026,2,9],  end: [2026,2,20], cat: 'partner' },
      { label: '제품 확정',                 short: '제품 확정',     start: [2026,2,23], end: [2026,2,23], cat: 'ohouse' },
      { label: '확정 확인 · 이의제기/취소', short: '확정 확인',     start: [2026,2,23], end: [2026,2,26], cat: 'partner' },
      { label: '계약 성립',                 short: '계약 성립',     start: [2026,2,27], end: [2026,2,27], cat: 'milestone' },
      { label: '리뷰어 초대',               short: '리뷰어 초대',   start: [2026,3,4],  end: [2026,3,4],  cat: 'ohouse' },
      { label: 'PRO/ROOKIE 리뷰어 모집',    short: '리뷰어 모집',   start: [2026,3,5],  end: [2026,3,6],  cat: 'ohouse' },
      { label: 'ROOKIE 당첨자 발표',        short: 'ROOKIE 발표',   start: [2026,3,9],  end: [2026,3,9],  cat: 'ohouse' },
      { label: 'PRO 리뷰어 내부 선정',      short: 'PRO 선정',      start: [2026,3,9],  end: [2026,3,9],  cat: 'ohouse' },
      { label: 'PRO 명단 컨펌',             short: 'PRO 컨펌',      start: [2026,3,9],  end: [2026,3,11], cat: 'partner' },
      { label: 'ROOKIE 제품 배송',          short: 'ROOKIE 배송',   start: [2026,3,9],  end: [2026,3,20], cat: 'partner' },
      { label: 'PRO 당첨자 발표',           short: 'PRO 발표',      start: [2026,3,12], end: [2026,3,12], cat: 'ohouse' },
      { label: 'PRO 제품 배송',             short: 'PRO 배송',      start: [2026,3,12], end: [2026,3,20], cat: 'partner' },
      { label: '리뷰 마감일',               short: '리뷰 마감',     start: [2026,3,31], end: [2026,3,31], cat: 'deadline' },
      { label: 'PRO 추가 마감일',           short: 'PRO 마감',      start: [2026,4,7],  end: [2026,4,7],  cat: 'deadline' },
    ]
  },
  apr: {
    months: [[2026,3],[2026,4],[2026,5]],
    events: [
      { label: '제품 등록 기간',            short: '제품 등록',     start: [2026,3,9],  end: [2026,3,13], cat: 'partner' },
      { label: '제품 확정',                 short: '제품 확정',     start: [2026,3,16], end: [2026,3,16], cat: 'ohouse' },
      { label: '확정 확인 · 이의제기/취소', short: '확정 확인',     start: [2026,3,16], end: [2026,3,19], cat: 'partner' },
      { label: '계약 성립',                 short: '계약 성립',     start: [2026,3,20], end: [2026,3,20], cat: 'milestone' },
      { label: 'ROOKIE 리뷰어 초대',        short: 'ROOKIE 초대',   start: [2026,3,30], end: [2026,3,30], cat: 'ohouse' },
      { label: 'ROOKIE 리뷰어 모집',        short: 'ROOKIE 모집',   start: [2026,3,30], end: [2026,3,31], cat: 'ohouse' },
      { label: 'ROOKIE 당첨자 발표',        short: 'ROOKIE 발표',   start: [2026,4,1],  end: [2026,4,1],  cat: 'ohouse' },
      { label: 'PRO 리뷰어 초대',           short: 'PRO 초대',      start: [2026,4,1],  end: [2026,4,1],  cat: 'ohouse' },
      { label: 'PRO 리뷰어 모집',           short: 'PRO 모집',      start: [2026,4,2],  end: [2026,4,3],  cat: 'ohouse' },
      { label: 'ROOKIE 제품 배송',          short: 'ROOKIE 배송',   start: [2026,4,1],  end: [2026,4,17], cat: 'partner' },
      { label: 'PRO 리뷰어 내부 선정',      short: 'PRO 선정',      start: [2026,4,6],  end: [2026,4,6],  cat: 'ohouse' },
      { label: 'PRO 명단 컨펌',             short: 'PRO 컨펌',      start: [2026,4,6],  end: [2026,4,8],  cat: 'partner' },
      { label: 'PRO 당첨자 발표',           short: 'PRO 발표',      start: [2026,4,9],  end: [2026,4,9],  cat: 'ohouse' },
      { label: 'PRO 제품 배송',             short: 'PRO 배송',      start: [2026,4,9],  end: [2026,4,17], cat: 'partner' },
      { label: '리뷰 마감일',               short: '리뷰 마감',     start: [2026,4,30], end: [2026,4,30], cat: 'deadline' },
      { label: 'PRO 추가 마감일',           short: 'PRO 마감',      start: [2026,5,7],  end: [2026,5,7],  cat: 'deadline' },
    ]
  },
  may: {
    months: [[2026,4],[2026,5],[2026,6]],
    events: [
      { label: '제품 등록 기간',            short: '제품 등록',     start: [2026,4,6],  end: [2026,4,17], cat: 'partner' },
      { label: '제품 확정',                 short: '제품 확정',     start: [2026,4,20], end: [2026,4,20], cat: 'ohouse' },
      { label: '확정 확인 · 이의제기/취소', short: '확정 확인',     start: [2026,4,20], end: [2026,4,23], cat: 'partner' },
      { label: '계약 성립',                 short: '계약 성립',     start: [2026,4,24], end: [2026,4,24], cat: 'milestone' },
      { label: '리뷰어 초대',               short: '리뷰어 초대',   start: [2026,4,28], end: [2026,4,28], cat: 'ohouse' },
      { label: 'PRO/ROOKIE 리뷰어 모집',    short: '리뷰어 모집',   start: [2026,4,29], end: [2026,4,30], cat: 'ohouse' },
      { label: 'ROOKIE 당첨자 발표',        short: 'ROOKIE 발표',   start: [2026,5,4],  end: [2026,5,4],  cat: 'ohouse' },
      { label: 'PRO 리뷰어 내부 선정',      short: 'PRO 선정',      start: [2026,5,4],  end: [2026,5,4],  cat: 'ohouse' },
      { label: 'PRO 명단 컨펌',             short: 'PRO 컨펌',      start: [2026,5,4],  end: [2026,5,7],  cat: 'partner' },
      { label: 'ROOKIE 제품 배송',          short: 'ROOKIE 배송',   start: [2026,5,4],  end: [2026,5,15], cat: 'partner' },
      { label: 'PRO 당첨자 발표',           short: 'PRO 발표',      start: [2026,5,8],  end: [2026,5,8],  cat: 'ohouse' },
      { label: 'PRO 제품 배송',             short: 'PRO 배송',      start: [2026,5,8],  end: [2026,5,15], cat: 'partner' },
      { label: '리뷰 마감일',               short: '리뷰 마감',     start: [2026,5,31], end: [2026,5,31], cat: 'deadline' },
      { label: 'PRO 추가 마감일',           short: 'PRO 마감',      start: [2026,6,7],  end: [2026,6,7],  cat: 'deadline' },
    ]
  }
};

const CAT_PRIORITY = { deadline: 4, milestone: 3, ohouse: 2, partner: 1 };
const MONTH_NAMES = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
const DAY_NAMES = ['월','화','수','목','금','토','일'];

function calDate(y, m, day) { return new Date(y, m - 1, day); }
function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function renderScheduleCalendar(key) {
  const container = document.getElementById('cal-' + key);
  if (!container) return;
  const data = CAL_EVENTS[key];

  const monthsHtml = data.months.map(([y, m]) => {
    const firstDay = new Date(y, m - 1, 1);
    const daysInMonth = new Date(y, m, 0).getDate();
    const startDow = (firstDay.getDay() + 6) % 7; // Mon=0..Sun=6

    const cells = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let i = 1; i <= daysInMonth; i++) cells.push(i);
    while (cells.length % 7 !== 0) cells.push(null);

    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

    const weeksHtml = weeks.map(week => {
      const cellsHtml = week.map((day, col) => {
        if (day === null) return `<div class="cal-cell cal-cell-empty"></div>`;
        const date = calDate(y, m, day);
        const isSat = col === 5, isSun = col === 6;

        // Highest-priority active event → background class
        let bgCat = null, bgPri = 0;
        data.events.forEach(ev => {
          const s = calDate(...ev.start), e = calDate(...ev.end);
          if (date >= s && date <= e && CAT_PRIORITY[ev.cat] > bgPri) {
            bgPri = CAT_PRIORITY[ev.cat]; bgCat = ev.cat;
          }
        });

        // Pills for events starting today
        const pillsHtml = data.events
          .filter(ev => sameDay(calDate(...ev.start), date))
          .map(ev => `<div class="cal-pill cat-${ev.cat}" title="${ev.label}">${ev.short}</div>`)
          .join('');

        const cls = [
          'cal-cell',
          bgCat ? 'cal-cell-bg-' + bgCat : '',
          isSat ? 'cal-cell-sat' : '',
          isSun ? 'cal-cell-sun' : ''
        ].filter(Boolean).join(' ');

        return `<div class="${cls}"><div class="cal-day-num">${day}</div>${pillsHtml}</div>`;
      }).join('');

      return `<div class="cal-week">${cellsHtml}</div>`;
    }).join('');

    const dowHtml = DAY_NAMES.map(d => `<div class="cal-dow">${d}</div>`).join('');

    return `<div class="cal-month">
      <div class="cal-month-name">${MONTH_NAMES[m - 1]} ${y}</div>
      <div class="cal-dow-row">${dowHtml}</div>
      ${weeksHtml}
    </div>`;
  }).join('');

  container.innerHTML = `
    <div class="cal-grid">${monthsHtml}</div>
    <div class="cal-legend">
      <div class="cal-legend-item cat-partner">파트너사</div>
      <div class="cal-legend-item cat-ohouse">오늘의집</div>
      <div class="cal-legend-item cat-milestone">계약 성립</div>
      <div class="cal-legend-item cat-deadline">마감일</div>
    </div>
  `;
}

['mar', 'apr', 'may'].forEach(renderScheduleCalendar);

// ─── Schedule Month Tabs ───
document.querySelectorAll('.schedule-month-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.schedule-month-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.schedule-table-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('schedule-' + tab.dataset.month);
    if (panel) panel.classList.add('active');
  });
});
