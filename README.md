# 🪙 Crypto Tracker (암호화폐 트래커)

> React, TypeScript, React Query를 활용하여 실시간 암호화폐 시세를 추적하는 개인 프로젝트입니다.

<br>

## 배포 URL
[https://dayeon0820.github.io/CRYPTO-TRACKER/]


<br>

## 📸 스크린샷
<img width="1915" height="664" alt="Image" src="https://github.com/user-attachments/assets/8d11e9ac-b508-413a-b974-0f27b5bf66e5" />


<img width="1915" height="664" alt="Image" src="https://github.com/user-attachments/assets/ba17ce8d-9de4-4208-a4cd-dff483e8bfd1" />


<img width="1915" height="664" alt="Image" src="https://github.com/user-attachments/assets/8377aecb-b9b8-47e1-ae83-fde83010ba34" />

<br>

## ✨ 주요 기능

* **실시간 코인 목록:** Coin Paprika API 연동 (상위 100개)
* **코인 상세 정보:** 개별 코인 정보, 현재 가격, 시세 변동 조회
* **가격 변동 차트:** ApexCharts 라이브러리를 이용한 시각화
* **탭 기반 UI:** 상세 페이지 내 '차트', '가격' 탭 (Nested Routes)
* **동적 페이지 타이틀:** `React Helmet`을 이용한 페이지별 `<title>` 동적 관리
* * **테마 컬러 변경:** `ThemeProvider`을 이용한 테마 색상 관리 

<br>

## 💻 사용 기술

* **Core:** React.js, TypeScript
* **State Management:** React Query (`@tanstack/react-query`)
* **Routing:** React Router (`v5`)
* **Styling:** Styled Components, Styled Reset
* **Chart:** ApexCharts, React-ApexCharts
* **Meta:** React Helmet

<br>

## 💡 핵심 학습 및 적용 내용

이 프로젝트는 단순히 기능을 구현하는 것을 넘어, **'왜' 이 기술을 사용하는지** 고민하며 개발했습니다.







### 1. 서버 상태 관리: `useEffect`에서 `React Query`로

**[Before]**
처음에는 `useEffect`와 `useState`를 사용해 API를 호출했습니다. 이 방식은 `loading`, `data`, `error` 상태를 모두 `useState`로 직접 관리해야 하는 번거로움이 있었습니다.

**[After]**
**`React Query`**를 도입하여 서버 상태 관리를 마이그레이션했습니다.

* `useQuery` 훅 하나로 데이터 페칭, 캐싱, 로딩/에러 상태 관리를 자동화했습니다.
* `ReactQueryDevtools`를 설치하여 캐시 상태를 시각적으로 확인하며 개발 효율을 높였습니다.
* **`refetchInterval: 5000`** 옵션을 통해 5초마다 데이터를 자동으로 다시 불러와(refetch) 실시간 시세를 폴링(polling)하도록 구현했습니다.



### 2. TypeScript를 활용한 타입 안정성 확보

API로부터 받아오는 복잡한 JSON 응답에 대응하기 위해 **`interface`**를 적극 활용했습니다.

* (Dev Tip) 브라우저 콘솔에서 `Object.keys()`와 `Object.values().map(v=>typeof v)` 명령어를 조합해, 복잡한 API 응답의 `interface` 초안을 빠르게 생성하는 팁을 적용했습니다.
* `useState<InfoData>()`, `useQuery<PriceData>()`처럼 상태와 훅에 명시적인 타입을 지정했습니다.
* **결과:** 데이터 구조를 명확히 하고, 자동 완성(IntelliSense) 기능을 활용해 개발 생산성을 높였습니다.


### 3. 중첩 라우트(Nested Routes) 및 동적 스타일링

React Router `v5`의 훅을 활용해 상세 페이지 내 탭(Tab) UI를 구현했습니다.

* `useParams`로 `coinId`를, `useLocation`으로 `state` (코인 이름)를 받아왔습니다.
* `useRouteMatch`를 사용해 현재 URL이 `/price`인지 `/chart`인지 판별했습니다.
* 이 값을 `Styled Component`의 `isActive`라는 prop으로 전달하여, 현재 활성화된 탭에만 다른 색상을 적용하는 **동적 스타일링**을 구현했습니다.



### 4. 차트 시각화 및 스타일링

* **Styling:** `styled-reset`과 `createGlobalStyle`을 사용해 전역 CSS를 초기화하고 일관된 디자인을 적용했습니다.
* **Chart:** `React-ApexCharts` 라이브러리를 사용하여 API로 받은 시계열 데이터를 라인 차트로 시각화했습니다. `options` prop을 통해 다크 모드 테마, 툴팁 포맷 등을 커스터마이징했습니다.
