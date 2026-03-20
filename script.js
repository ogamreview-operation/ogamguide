// ─── DOM References (모두 먼저 선언) ───
const navItems   = document.querySelectorAll('.nav-item[data-section]');
const sections   = document.querySelectorAll('.section');
const sidebar    = document.getElementById('sidebar');
const overlay    = document.getElementById('sidebarOverlay');
const menuBtn    = document.getElementById('menuBtn');
const topBtn     = document.getElementById('topBtn');
const searchInput   = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const faqTabs    = document.querySelectorAll('.faq-tab');
const faqLists   = document.querySelectorAll('.faq-list');

// ─── Navigation ───
function showSection(id) {
  sections.forEach(s => s.classList.toggle('active', s.id === id));
  navItems.forEach(n => n.classList.toggle('active', n.dataset.section === id));
  window.scrollTo({ top: 0, behavior: 'instant' });
  closeSidebar();
}

navItems.forEach(item => {
  item.addEventListener('click', () => showSection(item.dataset.section));
});

showSection('home');

// ─── Mobile Sidebar ───
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
});

overlay.addEventListener('click', closeSidebar);

// ─── Search ───
const searchData = [
  // 시작하기
  { title: '오감리뷰 광고 소개서', desc: '오감리뷰 서비스 전체 소개 PDF', section: 'home' },
  { title: '어드민 활용 가이드', desc: '오로라 어드민 등록 및 활용 방법', section: 'admin-guide' },
  { title: '오로라 어드민 접속', desc: 'orora.ohou.se 로그인 → 광고관리 → 오감리뷰 체험단', section: 'admin-guide' },
  { title: '대행사 관리 계정 추가', desc: '브랜드사 대표 계정으로 추가 계정 만들기', section: 'admin-guide' },
  // PRO
  { title: 'PRO 상품 소개', desc: 'Top 크리에이터, 단가, 기대효과', section: 'pro' },
  { title: 'PRO 단가', desc: '5명 150만원 / 10명 250만원 / 15명 350만원 / 20명 450만원 / 25명 550만원 / 30명 650만원', section: 'pro' },
  { title: 'PRO 기대효과', desc: '콘텐츠 평균 조회수 1.2만회, 스타일링샷 접속수 230% 증가', section: 'pro' },
  { title: 'PRO 2차 라이선스', desc: 'PRO에서 생산된 이미지 2차 라이선스 무료 제공', section: 'pro' },
  // 부가광고상품
  { title: '인스타그램 원브랜드 콘텐츠', desc: '부가광고상품 – 1,000만원, 팔로워 130만, 월 4개 한정', section: 'addon' },
  { title: '오감의 아이템 (원브랜드 콘텐츠)', desc: '부가광고상품 – 300만원, 상세페이지 유입 654%↑', section: 'addon' },
  { title: 'OGAM LIST', desc: '부가광고상품 – 100만원, 2-3개 브랜드 아카이빙형 콘텐츠', section: 'addon' },
  // ROOKIE
  { title: 'ROOKIE 상품 소개', desc: '내부 선별 크리에이터, 실사용 기반 리뷰', section: 'rookie' },
  { title: 'ROOKIE 단가', desc: '1인당 5만원, 최소 5인(25만원) ~ 최대 50인(250만원)', section: 'rookie' },
  { title: 'ROOKIE 기대효과', desc: '주문건수 1개월 후 평균 147% 증가', section: 'rookie' },
  { title: 'ROOKIE 2차 라이선스', desc: 'ROOKIE에서 생산된 이미지 2차 라이선스 무료 제공', section: 'rookie' },
  // 진행 프로세스
  { title: '진행 프로세스', desc: '오감리뷰 전체 진행 일정 및 단계 안내', section: 'process' },
  { title: '세부 일정 안내', desc: '3월 / 4월 / 5월 1회차 상세 일정표', section: 'process' },
  { title: '게재 보고서', desc: '리뷰 마감일 이후 7영업일 내 전달', section: 'process' },
  // 콘텐츠 예시
  { title: '콘텐츠 예시', desc: 'PRO·ROOKIE 카테고리별 실제 콘텐츠 링크', section: 'examples' },
  // 2차 라이선스
  { title: '2차 라이선스 활용 신청', desc: '루키/프로 라이선스 구글폼 신청', section: 'license' },
  { title: '2차 라이선스 정책', desc: '출처 표기 필수, 타 커머스 사용 불가, 활용 범위 안내', section: 'license' },
  // FAQ – 광고 안내
  { title: '체험단 최소 인원 및 단가', desc: 'PRO 최소 5인 150만원 ~ ROOKIE 1인당 5만원', section: 'faq' },
  { title: '영상 리뷰 가능 여부', desc: '기본 사진 리뷰 진행, PRO 부가상품으로 숏폼 가능', section: 'faq' },
  { title: '제품가 제한', desc: 'PRO 제공 제품가 5만원 미만 시 선정 제한 가능', section: 'faq' },
  { title: '부가광고상품 단독 진행', desc: '부가광고상품은 PRO 체험단 진행 후에만 가능', section: 'faq' },
  { title: 'PRO ROOKIE 동시 진행', desc: '한 회차에 PRO와 ROOKIE 동시 진행 가능', section: 'faq' },
  { title: '신청 가능한 제품 카테고리', desc: '렌탈·리퍼·의료기기 등 반려 가능성 높은 제품 안내', section: 'faq' },
  { title: '오늘의집 미입점 제품', desc: '오늘의집 내 판매 중인 제품만 신청 가능', section: 'faq' },
  { title: '설치형 제품 PRO ROOKIE', desc: '설치 조건 필요한 제품은 PRO로만 진행 가능', section: 'faq' },
  { title: '1개 구좌 여러 제품코드', desc: '1개 제품(상품코드)당 1개 체험단 구좌 기준', section: 'faq' },
  { title: '제품 대여 회수 진행', desc: '대여·회수 조건 진행 불가, 무상 제공 조건', section: 'faq' },
  { title: '1회차 2회차 차이', desc: '일정만 다르고 운영 방식 동일, 2회차는 상황에 따라 미진행', section: 'faq' },
  { title: 'PRO ROOKIE 리뷰 콘텐츠 차이', desc: 'PRO 사진 8장 이상 인스타 포함, ROOKIE 사진 3장 이상', section: 'faq' },
  { title: '여러 회차 진행', desc: '1개 제품으로 여러 회차 신청 가능, 매 회차 심사 후 승인', section: 'faq' },
  // FAQ – 체험단 신청
  { title: '신청 기간 놓친 경우', desc: '오감리뷰 메일로 문의하면 추가 인입 가능 여부 확인', section: 'faq' },
  { title: '어드민 계정 재사용', desc: '최초 등록 계정 이후 회차에서도 동일 사용 가능', section: 'faq' },
  { title: '옵션별 인원 설정', desc: '색상·사이즈 등 옵션별 인원 지정 가능', section: 'faq' },
  { title: '제품 주력 포인트 작성', desc: '제품명 주의사항, 상품 특성 3가지 이하, 해시태그 5개 이내', section: 'faq' },
  { title: '오감리뷰 제품 등록 신청 방법', desc: '오로라 로그인 → 광고관리 → 오감리뷰 체험단', section: 'faq' },
  { title: '모음전 링크 신청', desc: '모음전 링크로는 신청 불가, 상품코드 기반으로만 가능', section: 'faq' },
  { title: '제품 선정 기준', desc: '카테고리, 퀄리티, 리뷰 콘텐츠 유효 발행 여부 종합 심사', section: 'faq' },
  { title: '판매 종료 제품 신청', desc: '리뷰 작성 가능하도록 일시품절로 설정 필요', section: 'faq' },
  { title: '대행사 오로라 계정', desc: '브랜드사 대표 계정에서 관리 계정 생성 후 이용', section: 'faq' },
  { title: '원본 이미지 다운로드', desc: '어드민 리뷰 콘텐츠 내역 메뉴에서 URL 클릭 후 다운로드', section: 'faq' },
  // FAQ – 라이선스
  { title: '추가 리뷰 콘텐츠 활용 크리에이터 컨택', desc: '게재 보고서 외 이미지는 오감리뷰 메일 문의 필요', section: 'faq' },
  { title: '라이선스 활용 기한', desc: '별도 기한 제한 없이 지속 사용 가능', section: 'faq' },
  { title: '라이선스 활용 절차', desc: '신청서 제출 → 가공 시 가공요청서 → 발행 후 공유', section: 'faq' },
  { title: '라이선스 별도 구매', desc: '추가 비용 없이 제공, 신청서 제출 필수', section: 'faq' },
  { title: '라이선스 활용 관리', desc: '발행 후 오감리뷰에서 콘텐츠 지속 관리', section: 'faq' },
  // 문의
  { title: '카카오톡 문의', desc: '오감리뷰 실무 관련 문의 채널', section: 'home' },
  { title: '대표 메일', desc: 'ogam_review@bucketplace.net – 계약, 일정, 정산 안내', section: 'home' },
];

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

// ─── FAQ 탭 ───
faqTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    faqTabs.forEach(t => t.classList.remove('active'));
    faqLists.forEach(l => l.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// ─── FAQ 아코디언 ───
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
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

// ─── 세부 일정 탭 ───
document.querySelectorAll('.schedule-month-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.schedule-month-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.schedule-table-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('schedule-' + tab.dataset.month);
    if (panel) panel.classList.add('active');
  });
});

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
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });

// ─── Lightbox ───
function openLightbox(src, alt) {
  const lb  = document.getElementById('lightbox');
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

// ─── TOC anchor scroll ───
document.querySelectorAll('.toc-item').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 56;
    const top = target.getBoundingClientRect().top + window.scrollY - (headerH + 20);
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
