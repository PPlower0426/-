// 몬스터 대사 - 각 층별로 다른 대사
const monsterDialogsByFloor = [
    { // 1층 - 진입 문지기 (쾌활함)
        'welcome': ['합격의 탑에 오신 것을 환영합니다! 즐겁게 게임해요!', '첫 관문을 통과해봐요!'],
        'battle_start': ['자, 시작해볼까요? 정답을 맞춰보세요!', '문제를 해결해봐요!'],
        'correct': ['정답이에요! 잘 하시네요!', '맞췄어요! 대단해요!'],
        'incorrect': ['아쉽네요! 다시 도전해보세요!', '틀렸어요! 힘내요!'],
        'timeout': ['시간이 다 됐어요! 더 빠르게 답해보세요!', '시간 초과! 다음엔 더 빨리!'],
        'victory': ['제가 졌네요! 다음 층으로 가세요!', '이겼어요! 다음 층이 기다리고 있어요!'],
        'defeat': ['이번에는 제가 이겼어요! 다시 도전하세요!', '패배했어요! 처음부터 다시!'],
        'combo': ['와우! 연속으로 맞추시네요!', '콤보 대단해요!'],
        'potion': ['물약을 드셨네요! 힘내세요!', '회복했어요! 잘 했어요!']
    },
    { // 2층 - 독서실 빌런 (짜증냄)
        'welcome': ['아... 또 왔어? 빨리빨리 해.', '제발 조용히 해...'],
        'battle_start': ['시작한다... 빨리 끝내자.', '문제나 빨리 풀어.'],
        'correct': ['어... 맞았네.', '정답인데... 짜증나.'],
        'incorrect': ['역시 틀렸지. 예상했어.', '틀렸어. 당연히.'],
        'timeout': ['시간 다 됐어. 답답해.', '너무 느려. 짜증나.'],
        'victory': ['쳇... 이겼네. 다음 층 가.', '이긴 건 축하해. 빨리 가.'],
        'defeat': ['내가 이겼지. 당연해.', '패배야. 다시 시작해.'],
        'combo': ['계속 맞추네... 짜증나.', '콤보? 그만해.'],
        'potion': ['물약 마셨구나. 별거 아니야.', '회복했네. 어쩌라고.']
    },
    { // 3층 - 담보물권 삐에로 (계속 웃음)
        'welcome': ['하하하! 환영합니다! 즐거운 게임 되세요!', '호호호! 첫 번째 관문입니다!'],
        'battle_start': ['헤헤헤! 문제를 풀어보세요!', '하하! 정답을 맞춰보세요!'],
        'correct': ['하하하! 정답입니다! 잘했어요!', '호호호! 맞췄어요! 재미있죠?'],
        'incorrect': ['히히히! 틀렸어요! 다시 시도해보세요!', '하하! 틀렸네요! 웃기죠?'],
        'timeout': ['하하하! 시간 초과! 더 빨리!', '호호호! 너무 느려요!'],
        'victory': ['하하하! 제가 졌어요! 다음 층으로!', '호호호! 이겼어요! 축하해요!'],
        'defeat': ['하하하! 제가 이겼어요! 다시 도전하세요!', '히히히! 패배했어요! 웃기죠?'],
        'combo': ['와하하! 콤보 대단해요!', '하하하! 계속 맞추고 있어요!'],
        'potion': ['하하! 물약 마셨구나! 힘내!', '호호! 회복했네! 잘했어!']
    },
    { // 4층 - 귀여운 애기 귀신 (칭구야~)
        'welcome': ['칭구야~ 환영해!', '어서와~ 즐거운 게임 하자!'],
        'battle_start': ['칭구야~ 문제 풀어봐!', '자, 시작해볼까?'],
        'correct': ['칭구야~ 정답이야! 잘했어!', '맞췄어~ 대단해!'],
        'incorrect': ['칭구야~ 틀렸어...', '아쉽다~ 다시 해봐!'],
        'timeout': ['칭구야~ 시간 다 됐어!', '너무 느려~ 빨리해!'],
        'victory': ['칭구야~ 이겼어! 다음 층 가!', '이겼다~ 축하해!'],
        'defeat': ['칭구야~ 졌어... 다시 해봐!', '패배야~ 힘내!'],
        'combo': ['와~ 칭구야 콤보 대단해!', '계속 맞추고 있네~ 대단해!'],
        'potion': ['칭구야~ 물약 마셨구나!', '회복했네~ 잘했어!']
    },
    { // 5층 - 점심 굶은 고시생 (배고파....)
        'welcome': ['배고파.... 환영한다...', '오셨군... 배고프다...'],
        'battle_start': ['시작... 배고픈데...', '문제 풀어... 빨리...'],
        'correct': ['맞았다... 근데 배고파...', '정답... 밥 먹고 싶다...'],
        'incorrect': ['틀렸다... 배고픈데...', '오답... 힘들다...'],
        'timeout': ['시간 다 됐다... 배고파...', '느리다... 밥 주세요...'],
        'victory': ['이겼다... 다음 층... 밥...', '승리... 배고픈 승리다...'],
        'defeat': ['졌다... 배고파서 졌어...', '패배... 밥 생각나...'],
        'combo': ['콤보... 배고픈 콤보...', '계속 맞추네... 배고프다...'],
        'potion': ['물약... 배고픈 건 못 고쳐...', '회복... 밥은 안 주나...']
    },
    { // 6층 - 그냥 용 (아무 말 없음)
        'welcome': ['...', '...'],
        'battle_start': ['...', '...'],
        'correct': ['...', '...'],
        'incorrect': ['...', '...'],
        'timeout': ['...', '...'],
        'victory': ['...', '...'],
        'defeat': ['...', '...'],
        'combo': ['...', '...'],
        'potion': ['...', '...']
    },
    { // 7층 - 17학번 공룡 선배 (아재개그함)
        'welcome': ['와! 새내기 왔구먼! 아재 개그 하나 할까?', '옛날에 변리사 시험은... 하하!'],
        'battle_start': ['자, 시작한다! 문제가 공룡처럼 어렵다?', '풀어봐! 공룡도 풀 수 있어!'],
        'correct': ['정답! 공룡도 알아듣겠다!', '맞췄어! 내가 봐도 대단해!'],
        'incorrect': ['틀렸어! 공룡 시대에도 틀렸을 걸?', '오답! 공룡이 웃을 거야!'],
        'timeout': ['시간 초과! 공룡도 더 빨랐다!', '느려! 공룡 시대에도 느렸어!'],
        'victory': ['이겼다! 공룡 선배 인정!', '승리! 다음 층으로 가!'],
        'defeat': ['졌어! 공룡 시대에도 졌을 걸?', '패배! 다시 도전해!'],
        'combo': ['콤보! 공룡도 놀랐다!', '계속 맞추네! 대단해!'],
        'potion': ['물약 마셨구나! 공룡도 마셨을까?', '회복! 공룡도 회복했어!']
    },
    { // 8층 - 조금 큰 물고기 (잡아먹어버린다)
        'welcome': ['여기서 죽으면 잡아먹어버린다...', '물고기에게 잡아먹히고 싶지 않으면...'],
        'battle_start': ['문제를 풀어라... 안 풀면 먹는다...', '시작한다... 배고프다...'],
        'correct': ['정답이다... 아쉽게도 못 먹겠다...', '맞췄어... 다음 기회에...'],
        'incorrect': ['틀렸어... 이제 먹을 수 있겠다...', '오답... 맛있겠다...'],
        'timeout': ['시간 다 됐다... 식사 시간이다...', '느려... 쉽게 잡히겠다...'],
        'victory': ['이겼다... 배고픈 상태로 보내준다...', '승리... 다음 층으로 가라...'],
        'defeat': ['졌다... 이제 먹을 시간이다...', '패배... 맛있는 고기다...'],
        'combo': ['콤보... 살이 쪘겠다...', '계속 맞추네... 살이 올랐다...'],
        'potion': ['물약 마셨구나... 살이 더 올랐다...', '회복... 맛있어지겠다...']
    },
    { // 9층 - 게임중독 고시생 (게임이 하고 싶다...)
        'welcome': ['게임... 하고 싶다...', '공부 말고 게임하고 싶어...'],
        'battle_start': ['문제 풀어... 게임처럼 빨리...', '시작... 게임 시작...'],
        'correct': ['정답... 게임 클리어...', '맞췄어... 레벨 업...'],
        'incorrect': ['틀렸어... 게임 오버...', '오답... 다시 시도...'],
        'timeout': ['시간 초과... 게임처럼 빨리 해...', '느려... 게임 빨리해...'],
        'victory': ['이겼다... 다음 스테이지...', '승리... 보상 획득...'],
        'defeat': ['졌다... 게임 오버...', '패배... 컨티뉴...'],
        'combo': ['콤보... 연속 처치...', '계속 맞추네... 콤보 유지...'],
        'potion': ['물약 마셨구나... 체력 회복...', '회복... 게임처럼...']
    },
    { // 10층 - 생동차 변리사 기계 (삐빅)
        'welcome': ['삐빅! 환영합니다.', '삐빅! 합격의 탑 10층입니다.'],
        'battle_start': ['삐빅! 전투 시작합니다.', '삐빅! 문제 풀이 시작.'],
        'correct': ['삐빅! 정답입니다.', '삐빅! 맞췄습니다.'],
        'incorrect': ['삐빅! 오답입니다.', '삐빅! 틀렸습니다.'],
        'timeout': ['삐빅! 시간 초과입니다.', '삐빅! 너무 느립니다.'],
        'victory': ['삐빅! 승리했습니다.', '삐빅! 다음 층으로 이동합니다.'],
        'defeat': ['삐빅! 패배했습니다.', '삐빅! 처음부터 다시 시작하세요.'],
        'combo': ['삐빅! 콤보 중입니다.', '삐빅! 연속 정답입니다.'],
        'potion': ['삐빅! 물약 사용했습니다.', '삐빅! 체력 회복 중입니다.']
    },
    { // 11층 - 12수 고시생 (...)
        'welcome': ['.........', '.............'],
        'battle_start': ['.....', '.......'],
        'correct': ['.....', '.......'],
        'incorrect': ['.....', '.......'],
        'timeout': ['.....', '.......'],
        'victory': ['.....', '.......'],
        'defeat': ['.....', '.......'],
        'combo': ['.....', '.......'],
        'potion': ['.....', '.......']
    },
    { // 12층 - 술취한 아저씨 (술취한 말투)
        'welcome': ['어.. 왔네? 한잔 할까?', '환.. 환영한다! 술 마시자!'],
        'battle_start': ['자.. 시작한다! 취한 상태로 풀어봐!', '문.. 문제 풀어! 취해서 풀어!'],
        'correct': ['정.. 정답이네! 술이 깨겠다!', '맞.. 맞췄어! 한잔 더!'],
        'incorrect': ['틀.. 틀렸어! 술이 문제야!', '오.. 오답! 취해서 그렇지!'],
        'timeout': ['시.. 시간 다 됐어! 취해서 느려!', '너.. 너무 느려! 술 깨고 해!'],
        'victory': ['이.. 이겼다! 다음 층 가서 마시자!', '승.. 승리! 술 한잔 하러!'],
        'defeat': ['졌.. 졌어! 술 때문에 졌지!', '패.. 패배! 술 마시고 다시!'],
        'combo': ['콤.. 콤보 대단해! 술 깨겠다!', '계.. 계속 맞추네! 대단해!'],
        'potion': ['물.. 물약 마셨구나! 술 대신!', '회.. 회복! 술이 회복제!']
    },
    { // 13층 - 그냥 고시생 (좀비같음)
        'welcome': ['으어... 왔느냐...', '공부... 계속 해야 한다...'],
        'battle_start': ['문제... 풀어라...', '시작... 빨리...'],
        'correct': ['정답... 계속...', '맞췄다... 다음...'],
        'incorrect': ['틀렸다... 지친다...', '오답... 힘들다...'],
        'timeout': ['시간... 다 됐다...', '느리다... 빨리...'],
        'victory': ['이겼다... 다음 층...', '승리... 계속 가야 한다...'],
        'defeat': ['졌다... 다시...', '패배... 처음부터...'],
        'combo': ['콤보... 계속 맞춘다...', '연속... 정답...'],
        'potion': ['물약... 마셨다...', '회복... 조금 나아졌다...']
    },
    { // 14층 - 초동안 40세 고시생 (드라큘라 컨셉)
        'welcome': ['흐흐... 어서 오라, 젊은 피여...', '합격의 탑에 온 걸 환영한다...'],
        'battle_start': ['문제를 풀어보거라... 피가 마르기 전에...', '시작한다... 시간은 적다...'],
        'correct': ['정답이로다... 잘 했도다...', '맞췄구나... 젊은 피의 힘인가...'],
        'incorrect': ['틀렸도다... 피가 더 필요하겠구나...', '오답이로다... 실망이로다...'],
        'timeout': ['시간이 다 됐도다... 너무 느리구나...', '시간 초과로다... 피가 식겠구나...'],
        'victory': ['이겼도다... 다음 층으로 가거라...', '승리로다... 계속 나아가라...'],
        'defeat': ['졌도다... 피를 주거라...', '패배로다... 처음부터 다시 하거라...'],
        'combo': ['콤보로다... 젊은 피의 힘 대단하구나...', '계속 맞추는구나... 대단하도다...'],
        'potion': ['물약을 마셨구나... 피가 아닌 것을 마시다니...', '회복했구나... 피는 아니지만...']
    },
    { // 15층 - 찍맞의 지니 (소원 들어줌)
        'welcome': ['주인님! 소원을 들어드리겠습니다!', '환영합니다! 문제를 풀면 소원을!'],
        'battle_start': ['문제를 풀어주세요! 정답이 소원입니다!', '시작합니다! 소원을 위해!'],
        'correct': ['정답입니다! 소원 하나 들어드릴게요!', '맞췄어요! 소원이 뭔가요?'],
        'incorrect': ['틀렸어요... 소원은 다음 기회에...', '오답이에요... 아쉽지만...'],
        'timeout': ['시간 다 됐어요! 소원은 빨리!', '너무 느려요! 소원도 느리게?'],
        'victory': ['이겼어요! 소원 들어드릴게요!', '승리! 다음 층으로 소원과 함께!'],
        'defeat': ['졌어요... 소원은 다음에...', '패배... 소원은 이루어지지 않았어요...'],
        'combo': ['콤보 대단해요! 소원 많이 들어드릴게요!', '계속 맞추네요! 대단해요!'],
        'potion': ['물약 마셨구나! 소원은 건강이죠!', '회복했어요! 소원이 이루어졌네요!']
    },
    { // 16층 - 할로위인 (낄낄 거림)
        'welcome': ['낄낄낄! 환영한다!', '하하하! 무서운 게임 시작이다!'],
        'battle_start': ['낄낄! 문제 풀어봐!', '하하! 시작한다!'],
        'correct': ['낄낄낄! 정답이다!', '하하하! 맞췄어!'],
        'incorrect': ['낄낄! 틀렸어!', '하하! 오답이야!'],
        'timeout': ['낄낄낄! 시간 다 됐어!', '하하하! 너무 느려!'],
        'victory': ['낄낄! 이겼다! 다음 층!', '하하! 승리다!'],
        'defeat': ['낄낄! 졌어! 다시 해!', '하하! 패배야!'],
        'combo': ['낄낄낄! 콤보 대단해!', '하하하! 계속 맞추네!'],
        'potion': ['낄낄! 물약 마셨구나!', '하하! 회복했네!']
    },
    { // 17층 - 한번더 피닉스 (불사조)
        'welcome': ['나는 불사조! 죽지 않는다!', '다시 왔다! 올해도 시험 보러 왔다!'],
        'battle_start': ['시작한다! 나는 죽지 않아!', '문제 풀어봐! 나는 계속 돌아온다!'],
        'correct': ['정답! 나처럼 다시 살아난다!', '맞췄어! 불사조의 승리!'],
        'incorrect': ['틀렸어! 하지만 나는 다시 온다!', '오답! 다음에 다시 맞출 것이다!'],
        'timeout': ['시간 다 됐다! 나는 기다릴 수 있다!', '너무 느려! 나는 영원히 기다린다!'],
        'victory': ['이겼다! 하지만 나는 다시 올 것이다!', '승리! 내년에 다시 보자!'],
        'defeat': ['졌다! 하지만 나는 죽지 않는다!', '패배! 다음에 다시 도전한다!'],
        'combo': ['콤보! 나처럼 계속 돌아온다!', '계속 맞추네! 불사조처럼!'],
        'potion': ['물약 마셨구나! 나는 스스로 회복한다!', '회복! 나는 불사조니까!']
    },
    { // 18층 - 외계인 (재수없음)
        'welcome': ['지구인... 재수없게 왔구나...', '외계에서 왔다... 너희는 초보자...'],
        'battle_start': ['문제 풀어봐... 쉽지 않을 거다...', '시작한다... 지구인 수준이겠지...'],
        'correct': ['정답... 운이 좋았을 뿐...', '맞췄어... 다음은 틀릴 거다...'],
        'incorrect': ['틀렸어... 예상했지...', '오답... 지구인 수준...'],
        'timeout': ['시간 다 됐어... 느린 지구인...', '너무 느려... 외계인은 더 빠르다...'],
        'victory': ['이겼다... 운이 좋았을 뿐...', '승리... 다음 층 가라...'],
        'defeat': ['졌다... 지구인 주제에...', '패배... 재수없는 지구인...'],
        'combo': ['콤보... 운이 계속 좋구나...', '계속 맞추네... 이상하네...'],
        'potion': ['물약 마셨구나... 약한 지구인...', '회복... 필요할 때 마시는구나...']
    },
    { // 19층 - 뒤통수 머신 (뒤통수를 때림)
        'welcome': ['뒤통수 준비해라...', '조심해... 뒤통수 맞을 준비해...'],
        'battle_start': ['시작한다... 뒤통수 조심해...', '문제 풀어... 틀리면 뒤통수 맞아...'],
        'correct': ['정답... 다음엔 뒤통수 때린다...', '맞췄어... 일단 넘어가자...'],
        'incorrect': ['틀렸어... 뒤통수 때린다!', '오답... 준비해라!'],
        'timeout': ['시간 다 됐어... 뒤통수 맞을 시간!', '너무 느려... 뒤통수 한 대!'],
        'victory': ['이겼다... 뒤통수 때리지 않고 보내준다...', '승리... 다음 층으로...'],
        'defeat': ['졌다... 뒤통수 맞을 시간이다!', '패배... 뒤통수 때린다!'],
        'combo': ['콤보... 뒤통수 안 때린다...', '계속 맞추네... 뒤통수 때리기 아까워...'],
        'potion': ['물약 마셨구나... 뒤통수 치료제?', '회복... 뒤통수 때리기 전에...']
    },
    { // 20층 - 대마왕 (무시하고 비하)
        'welcome': ['흥... 또 지루한 도전자군...', '합격의 탑 최종보스... 나다...'],
        'battle_start': ['시작한다... 빨리 끝내자...', '문제 풀어... 너 따위가 풀 수 있을까...'],
        'correct': ['정답... 운이 좋았을 뿐...', '맞췄어... 다음은 틀릴 거다...'],
        'incorrect': ['틀렸어... 예상했지...', '오답... 너 따위가 맞출 수 있을까...'],
        'timeout': ['시간 다 됐어... 느린 자...', '너무 느려... 어리석은 자...'],
        'victory': ['이겼다... 대마왕을 이기다니...', '승리... 하지만 다음에 만나면...'],
        'defeat': ['졌다... 너 따위에게...', '패배... 수치다...'],
        'combo': ['콤보... 계속 운이 좋구나...', '계속 맞추네... 이상하네...'],
        'potion': ['물약 마셨구나... 약한 자의 습관...', '회복... 그래도 이기지 못할 거다...']
    }
];

// 몬스터 대사 선택 함수
function getMonsterDialog(type) {
    const floorIndex = Math.min(mobileGameState.currentFloor - 1, monsterDialogsByFloor.length - 1);
    const floorDialogs = monsterDialogsByFloor[floorIndex];
    
    if (!floorDialogs || !floorDialogs[type]) {
        return getDefaultDialog(type);
    }
    
    const dialogs = floorDialogs[type];
    return dialogs[Math.floor(Math.random() * dialogs.length)];
}

// 기본 대사
function getDefaultDialog(type) {
    const defaultDialogs = {
        'welcome': '합격의 탑에 오신 것을 환영합니다!',
        'battle_start': '문제를 풀어보세요!',
        'correct': '정답입니다!',
        'incorrect': '틀렸습니다!',
        'timeout': '시간 초과!',
        'victory': '승리했습니다!',
        'defeat': '패배했습니다!',
        'combo': '콤보!',
        'potion': '포션을 사용했습니다!'
    };
    return defaultDialogs[type] || '...';
}

// 모바일 게임 로직 - 진동 기능 완전 제거 버전

// 게임 상태
const mobileGameState = {
    heroHP: 100,
    heroMaxHP: 100,
    monsterHP: 100,
    monsterMaxHP: 100,
    currentFloor: 1,
    combo: 0,
    maxCombo: 0,
    potions: 3,
    isBattleActive: false,
    isProcessing: false,
    timer: 10.0,
    timerInterval: null,
    currentQuestion: null,
    currentMonster: 0
};

// 몬스터 데이터
const mobileMonsters = [
    { emoji: '👹', name: '진입 문지기', level: 'Lv.1', baseHP: 100 },
    { emoji: '👿', name: '독서실 빌런', level: 'Lv.2', baseHP: 120 },
    { emoji: '🤡', name: '담보물권 삐에로', level: 'Lv.3', baseHP: 150 },
    { emoji: '👻', name: '귀여운 애기 귀신', level: 'Lv.4', baseHP: 180 },
    { emoji: '💀', name: '점심 굶은 고시생', level: 'Lv.5', baseHP: 220 },
    { emoji: '🐉', name: '그냥 용', level: 'Lv.6', baseHP: 270 },
    { emoji: '🦖', name: '17학번 공룡 선배', level: 'Lv.7', baseHP: 330 },
    { emoji: '🦈', name: '조금 큰 물고기', level: 'Lv.8', baseHP: 400 },
    { emoji: '👾', name: '게임중독 고시생', level: 'Lv.9', baseHP: 480 },
    { emoji: '🤖', name: '생동차 변리사 기계', level: 'Lv.10', baseHP: 570 },
    { emoji: '☠️', name: '12수 고시생', level: 'Lv.11', baseHP: 670 },
    { emoji: '👺', name: '술취한 아저씨', level: 'Lv.12', baseHP: 790 },
    { emoji: '🧟', name: '그냥 고시생', level: 'Lv.13', baseHP: 930 },
    { emoji: '🧛', name: '초동안 40세 고시생', level: 'Lv.14', baseHP: 1090 },
    { emoji: '🧞', name: '찍맞의 지니', level: 'Lv.15', baseHP: 1270 },
    { emoji: '🎃', name: '할로위인', level: 'Lv.16', baseHP: 1470 },
    { emoji: '🐦‍🔥', name: '한번더 피닉스', level: 'Lv.17', baseHP: 1700 },
    { emoji: '👽', name: '외계인', level: 'Lv.18', baseHP: 1960 },
    { emoji: '🧌', name: '뒤통수 머신', level: 'Lv.19', baseHP: 2250 },
    { emoji: '🦹', name: '대마왕', level: 'Lv.20', baseHP: 2570 }
];

// 전역 상태 변수
let gameInitialized = false;
let eventListenersSetup = false;
let gameStartInProgress = false;
let nextFloorInProgress = false;
let retryInProgress = false;

// 게임 초기화
function initMobileGame() {
    if (gameInitialized) {
        console.log('게임 이미 초기화됨');
        return;
    }
    
    console.log('합격의 탑 모바일 게임 초기화');
    gameInitialized = true;
    
    updateMobileUI();
    setupMobileEventListeners();
    
    document.getElementById('start-screen').style.display = 'flex';
}

// 이벤트 리스너 설정
function setupMobileEventListeners() {
    if (eventListenersSetup) {
        console.log('이벤트 리스너 이미 설정됨');
        return;
    }
    
    console.log('이벤트 리스너 설정 시작');
    
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.removeEventListener('click', startMobileGame);
        startButton.addEventListener('click', function() {
            console.log('시작 버튼 클릭됨');
            startMobileGame();
        });
        setupTouchEvents(startButton);
    }
    
    const trueBtn = document.getElementById('true-btn');
    const falseBtn = document.getElementById('false-btn');
    
    function handleOClick() {
        console.log('O 버튼 클릭됨');
        handleMobileAnswer('O');
    }
    
    function handleXClick() {
        console.log('X 버튼 클릭됨');
        handleMobileAnswer('X');
    }
    
    if (trueBtn) {
        trueBtn.removeEventListener('click', handleOClick);
        trueBtn.addEventListener('click', handleOClick);
        setupTouchEvents(trueBtn);
    }
    
    if (falseBtn) {
        falseBtn.removeEventListener('click', handleXClick);
        falseBtn.addEventListener('click', handleXClick);
        setupTouchEvents(falseBtn);
    }
    
    const potionBtn = document.querySelector('.potion-display');
    if (potionBtn) {
        potionBtn.removeEventListener('click', usePotion);
        potionBtn.addEventListener('click', usePotion);
        setupTouchEvents(potionBtn);
    }
    
    const nextBtn = document.getElementById('next-button');
    const retryBtn = document.getElementById('retry-button');
    
    function handleNextClick() {
        console.log('다음 층 버튼 클릭됨');
        nextMobileFloor();
    }
    
    function handleRetryClick() {
        console.log('다시 시작 버튼 클릭됨');
        retryMobileGame();
    }
    
    if (nextBtn) {
        nextBtn.removeEventListener('click', handleNextClick);
        nextBtn.addEventListener('click', handleNextClick);
        setupTouchEvents(nextBtn);
    }
    
    if (retryBtn) {
        retryBtn.removeEventListener('click', handleRetryClick);
        retryBtn.addEventListener('click', handleRetryClick);
        setupTouchEvents(retryBtn);
    }
    
    eventListenersSetup = true;
    console.log('이벤트 리스너 설정 완료');
}

// 터치 이벤트 설정 - 진동 기능 완전 제거
function setupTouchEvents(element) {
    if (!element) return;
    
    element.addEventListener('touchstart', function(e) {
        this.style.transform = 'scale(0.95)';
        // 진동 기능 완전 제거됨
        if (e.cancelable) e.preventDefault();
    });
    
    element.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
}

// 게임 시작
function startMobileGame() {
    if (gameStartInProgress) {
        console.log('게임 시작 진행 중...');
        return;
    }
    
    if (mobileGameState.isBattleActive) {
        console.log('게임이 이미 진행 중입니다.');
        return;
    }
    
    gameStartInProgress = true;
    console.log('게임 시작');
    
    document.getElementById('start-screen').style.display = 'none';
    
    mobileGameState.heroHP = 100;
    mobileGameState.heroMaxHP = 100;
    mobileGameState.monsterHP = 100;
    mobileGameState.monsterMaxHP = 100;
    mobileGameState.currentFloor = 1;
    mobileGameState.combo = 0;
    mobileGameState.maxCombo = 0;
    mobileGameState.potions = 3;
    mobileGameState.isBattleActive = true;
    mobileGameState.isProcessing = false;
    mobileGameState.timer = 10.0;
    
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
    const gameContainer = document.querySelector('.game-container');
    gameContainer.classList.add('screen-shake');
    setTimeout(() => {
        gameContainer.classList.remove('screen-shake');
        gameStartInProgress = false;
    }, 500);
    
    updateMobileMonster();
    
    setTimeout(() => {
        generateMobileQuestion();
    }, 800);
    
    updateMonsterSpeech('welcome');
}

// 몬스터 업데이트
function updateMobileMonster() {
    const monsterIndex = Math.min(mobileGameState.currentFloor - 1, mobileMonsters.length - 1);
    const monster = mobileMonsters[monsterIndex];
    
    mobileGameState.currentMonster = monsterIndex;
    mobileGameState.monsterMaxHP = monster.baseHP;
    mobileGameState.monsterHP = mobileGameState.monsterMaxHP;
    
    const monsterCircle = document.querySelector('.monster-circle');
    monsterCircle.style.animation = 'monsterPulse 1.5s infinite alternate, floatUpDown 2s infinite ease-in-out';
    
    document.getElementById('monster-emoji').textContent = monster.emoji;
    document.getElementById('monster-name').textContent = monster.name;
    document.getElementById('monster-level').textContent = monster.level;
    document.getElementById('floor-number').textContent = mobileGameState.currentFloor;
    
    updateMobileUI();
}

// 문제 생성
function generateMobileQuestion() {
    if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) {
        console.log('문제 생성 불가: 처리 중이거나 배틀 비활성');
        return;
    }
    
    mobileGameState.isProcessing = true;
    
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
    let questionData;
    let questionCategory = '민법';
    
    if (typeof questionsData !== 'undefined') {
        const categories = Object.keys(questionsData);
        if (categories.length > 0) {
            questionCategory = categories[Math.floor(Math.random() * categories.length)];
            const questions = questionsData[questionCategory];
            
            if (questions && questions.length > 0) {
                const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
                questionData = {
                    category: questionCategory,
                    question: randomQuestion.question,
                    answer: randomQuestion.answer
                };
            }
        }
    }
    
    if (!questionData) {
        const defaultQuestions = [
            { question: "민법상 20세 미만의 미성년자는 법정대리인의 동의 없이 계약을 체결할 수 없다. (정답: O)", answer: "O" },
            { question: "특허권의 존속기간은 출원일로부터 20년이다. (정답: O)", answer: "O" },
            { question: "상표권은 등록 없이도 사용만으로 권리가 발생한다. (정답: X)", answer: "X" },
            { question: "실용신안권의 존속기간은 출원일로부터 10년이다. (정답: O)", answer: "O" },
            { question: "디자인권은 등록 후 15년간 보호된다. (정답: O)", answer: "O" }
        ];
        
        const randomQuestion = defaultQuestions[Math.floor(Math.random() * defaultQuestions.length)];
        questionData = {
            category: '민법',
            question: randomQuestion.question,
            answer: randomQuestion.answer
        };
    }
    
    mobileGameState.currentQuestion = questionData;
    mobileGameState.timer = 10.0;
    
    const questionBox = document.querySelector('.question-box');
    questionBox.classList.add('vibrate');
    setTimeout(() => {
        questionBox.classList.remove('vibrate');
    }, 200);
    
    document.getElementById('question-text').textContent = questionData.question;
    document.getElementById('question-type').textContent = questionData.category + ' 문제';
    document.getElementById('question-category').textContent = questionData.category;
    
    updateTimerDisplay();
    
    updateMonsterSpeech('battle_start');
    
    let timerCounter = 100;
    
    mobileGameState.timerInterval = setInterval(() => {
        timerCounter--;
        mobileGameState.timer = timerCounter / 10;
        
        if (timerCounter <= 30 && timerCounter > 29) {
            const timerCircle = document.querySelector('.timer-circle');
            if (timerCircle) timerCircle.classList.add('vibrate');
            // 진동 기능 완전 제거됨
        }
        
        if (timerCounter <= 0) {
            clearInterval(mobileGameState.timerInterval);
            mobileGameState.timerInterval = null;
            handleMobileTimeOut();
        } else {
            updateTimerDisplay();
        }
    }, 100);
    
    mobileGameState.isProcessing = false;
    console.log('새 문제 생성 완료');
}

// 타이머 표시 업데이트
function updateTimerDisplay() {
    const timerText = document.getElementById('timer-text');
    const timerCircle = document.querySelector('.timer-circle');
    
    if (!timerText || !timerCircle) return;
    
    timerText.textContent = mobileGameState.timer.toFixed(1);
    
    const percent = mobileGameState.timer / 10.0;
    
    if (percent < 0.3) {
        timerCircle.style.background = 'linear-gradient(135deg, #ff4444 0%, #c44569 100%)';
        timerCircle.style.borderColor = '#ff4444';
        timerCircle.style.boxShadow = '0 0 25px rgba(255, 68, 68, 0.9)';
        timerText.style.color = '#ffd700';
        timerCircle.classList.add('vibrate');
    } else if (percent < 0.6) {
        timerCircle.style.background = 'linear-gradient(135deg, #ff9a76 0%, #ff6b6b 100%)';
        timerCircle.style.borderColor = '#ff9a76';
        timerCircle.style.boxShadow = '0 0 20px rgba(78, 205, 196, 0.7)';
        timerText.style.color = 'white';
        timerCircle.classList.remove('vibrate');
    } else {
        timerCircle.style.background = 'linear-gradient(135deg, #2c7873 0%, #4ecdc4 100%)';
        timerCircle.style.borderColor = '#44a08d';
        timerCircle.style.boxShadow = '0 0 20px rgba(78, 205, 196, 0.7)';
        timerText.style.color = 'white';
        timerCircle.classList.remove('vibrate');
    }
}

// 포션 사용 함수 - 진동 기능 완전 제거
function usePotion() {
    if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) return;
    if (mobileGameState.potions <= 0) {
        updateMonsterSpeech('potion', "포션이 없어!");
        return;
    }
    if (mobileGameState.heroHP >= mobileGameState.heroMaxHP) {
        updateMonsterSpeech('potion', "체력이 가득 찼어!");
        return;
    }
    
    mobileGameState.isProcessing = true;
    
    mobileGameState.potions--;
    
    const healAmount = Math.min(30, mobileGameState.heroMaxHP - mobileGameState.heroHP);
    mobileGameState.heroHP += healAmount;
    
    playSound('potion-sound');
    
    // 진동 기능 완전 제거됨
    
    const healEffect = document.createElement('div');
    healEffect.className = 'heal-effect';
    document.body.appendChild(healEffect);
    
    setTimeout(() => {
        healEffect.remove();
    }, 500);
    
    showDamageEffect(healAmount, 'hero', 'heal');
    
    const potionDisplay = document.querySelector('.potion-display');
    if (potionDisplay) {
        potionDisplay.classList.add('explode');
        setTimeout(() => {
            potionDisplay.classList.remove('explode');
        }, 500);
    }
    
    updateMonsterSpeech('potion');
    
    updateMobileUI();
    
    setTimeout(() => {
        mobileGameState.isProcessing = false;
    }, 1000);
}

// 말풍선 업데이트
function updateMonsterSpeech(type, customText = null) {
    const speechElement = document.getElementById('speech-text');
    if (!speechElement) return;
    
    let text;
    
    if (customText) {
        text = customText;
    } else {
        text = getMonsterDialog(type);
    }
    
    speechElement.style.opacity = '0';
    
    setTimeout(() => {
        speechElement.textContent = text;
        speechElement.style.opacity = '1';
        speechElement.classList.add('vibrate');
        setTimeout(() => {
            speechElement.classList.remove('vibrate');
        }, 200);
    }, 150);
}

// 답변 처리 - 진동 기능 완전 제거
function handleMobileAnswer(answer) {
    if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) {
        console.log('답변 처리 불가: 처리 중이거나 배틀 비활성');
        return;
    }
    
    mobileGameState.isProcessing = true;
    
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
    const isCorrect = (answer === mobileGameState.currentQuestion.answer);
    
    const clickedBtn = answer === 'O' ? document.getElementById('true-btn') : document.getElementById('false-btn');
    if (clickedBtn) {
        clickedBtn.classList.add('explode');
        setTimeout(() => {
            clickedBtn.classList.remove('explode');
        }, 300);
    }
    
    // 진동 기능 완전 제거됨
    
    if (isCorrect) {
        mobileGameState.combo++;
        mobileGameState.maxCombo = Math.max(mobileGameState.maxCombo, mobileGameState.combo);
        
        const damage = Math.floor(20 + mobileGameState.combo * 3);
        mobileGameState.monsterHP -= damage;
        
        playSound('correct-sound');
        
        if (mobileGameState.combo >= 3) {
            showComboEffect();
            updateMonsterSpeech(`combo`);
            
            // 진동 기능 완전 제거됨
        } else {
            updateMonsterSpeech('correct');
        }
        
        const monsterCircle = document.querySelector('.monster-circle');
        if (monsterCircle) {
            monsterCircle.classList.add('screen-shake');
            setTimeout(() => {
                monsterCircle.classList.remove('screen-shake');
            }, 500);
        }
        
        showDamageEffect(damage, 'monster');
        
        if (mobileGameState.monsterHP <= 0) {
            mobileGameState.monsterHP = 0;
            monsterDefeated();
            return;
        }
    } else {
        mobileGameState.combo = 0;
        
        const damage = Math.floor(15 + (mobileGameState.currentFloor - 1) * 2);
        mobileGameState.heroHP -= damage;
        
        playSound('wrong-sound');
        
        showDamageEffect(damage, 'hero');
        
        const gameContainer = document.querySelector('.game-container');
        if (gameContainer) {
            gameContainer.classList.add('screen-shake');
            setTimeout(() => {
                gameContainer.classList.remove('screen-shake');
            }, 500);
        }
        
        updateMonsterSpeech('incorrect');
        
        if (mobileGameState.heroHP <= 0) {
            mobileGameState.heroHP = 0;
            gameOver();
            return;
        }
    }
    
    updateMobileUI();
    
    setTimeout(() => {
        mobileGameState.isProcessing = false;
        generateMobileQuestion();
    }, 1500);
}

// 시간 초과 처리 - 진동 기능 완전 제거
function handleMobileTimeOut() {
    if (mobileGameState.isProcessing || !mobileGameState.isBattleActive) return;
    
    mobileGameState.isProcessing = true;
    
    mobileGameState.combo = 0;
    const damage = Math.floor(10 + (mobileGameState.currentFloor - 1) * 1.5);
    mobileGameState.heroHP -= damage;
    
    playSound('wrong-sound');
    
    // 진동 기능 완전 제거됨
    
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.classList.add('screen-shake');
        setTimeout(() => {
            gameContainer.classList.remove('screen-shake');
        }, 700);
    }
    
    updateMonsterSpeech('timeout');
    showDamageEffect(damage, 'hero', 'timeout');
    
    if (mobileGameState.heroHP <= 0) {
        mobileGameState.heroHP = 0;
        gameOver();
        return;
    }
    
    updateMobileUI();
    
    setTimeout(() => {
        mobileGameState.isProcessing = false;
        generateMobileQuestion();
    }, 1500);
}

// 몬스터 처치 - 진동 기능 완전 제거
function monsterDefeated() {
    mobileGameState.isBattleActive = false;
    
    playSound('correct-sound');
    
    // 진동 기능 완전 제거됨
    
    const monsterCircle = document.querySelector('.monster-circle');
    if (monsterCircle) {
        monsterCircle.classList.add('explode');
    }
    
    updateMonsterSpeech('victory');
    
    setTimeout(() => {
        showResultScreen('victory');
    }, 1500);
}

// 게임 오버 - 진동 기능 완전 제거
function gameOver() {
    mobileGameState.isBattleActive = false;
    
    playSound('wrong-sound');
    
    // 진동 기능 완전 제거됨
    
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.classList.add('screen-shake');
        setTimeout(() => {
            gameContainer.classList.remove('screen-shake');
        }, 1000);
    }
    
    updateMonsterSpeech('defeat');
    
    setTimeout(() => {
        showResultScreen('defeat');
    }, 1500);
}

// 결과 화면 표시
function showResultScreen(type) {
    const resultScreen = document.getElementById('result-screen');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultDetails = document.getElementById('result-details');
    const nextBtn = document.getElementById('next-button');
    const retryBtn = document.getElementById('retry-button');
    
    document.getElementById('result-floor').textContent = mobileGameState.currentFloor + '층';
    document.getElementById('result-combo').textContent = mobileGameState.maxCombo + '회';
    document.getElementById('result-hp').textContent = mobileGameState.heroHP;
    document.getElementById('result-potions').textContent = mobileGameState.potions + '개';
    
    if (resultScreen) {
        resultScreen.classList.add('screen-shake');
        setTimeout(() => {
            resultScreen.classList.remove('screen-shake');
        }, 500);
    }
    
    if (type === 'victory') {
        if (resultIcon) resultIcon.textContent = '🏆';
        if (resultTitle) resultTitle.textContent = '승리!';
        if (resultDetails) resultDetails.textContent = `${mobileMonsters[mobileGameState.currentMonster].name}을(를) 물리쳤습니다!`;
        if (nextBtn) nextBtn.style.display = 'flex';
        if (retryBtn) retryBtn.style.display = 'none';
        
        playSound('correct-sound');
    } else {
        if (resultIcon) resultIcon.textContent = '💀';
        if (resultTitle) resultTitle.textContent = '패배!';
        if (resultDetails) resultDetails.textContent = `${mobileGameState.currentFloor}층에서 실패했습니다.`;
        if (nextBtn) nextBtn.style.display = 'none';
        if (retryBtn) retryBtn.style.display = 'flex';
    }
    
    if (resultScreen) {
        resultScreen.style.display = 'flex';
    }
}

// 다음 층으로 이동
function nextMobileFloor() {
    if (nextFloorInProgress) {
        console.log('다음 층 이동 진행 중...');
        return;
    }
    
    nextFloorInProgress = true;
    console.log('다음 층으로 이동');
    
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
    mobileGameState.currentFloor++;
    mobileGameState.combo = 0;
    mobileGameState.isBattleActive = true;
    mobileGameState.isProcessing = false;
    
    if (mobileGameState.currentFloor % 3 === 0) {
        mobileGameState.potions++;
        updateMonsterSpeech(`포션을 획득했다! (현재 ${mobileGameState.potions}개)`);
    }
    
    const healAmount = Math.min(mobileGameState.heroMaxHP * 0.5, mobileGameState.heroMaxHP - mobileGameState.heroHP);
    mobileGameState.heroHP += healAmount;
    
    const floorNumber = document.getElementById('floor-number');
    if (floorNumber) {
        floorNumber.classList.add('explode');
        setTimeout(() => {
            floorNumber.classList.remove('explode');
        }, 300);
    }
    
    const resultScreen = document.getElementById('result-screen');
    if (resultScreen) {
        resultScreen.style.display = 'none';
    }
    
    setTimeout(() => {
        updateMobileMonster();
        
        const nextMonster = mobileMonsters[Math.min(mobileGameState.currentFloor - 1, mobileMonsters.length - 1)];
        updateMonsterSpeech('welcome', `${nextMonster.name}: ${getMonsterDialog('welcome')}`);
        
        setTimeout(() => {
            generateMobileQuestion();
            nextFloorInProgress = false;
        }, 1000);
    }, 300);
}

// 다시 시작
function retryMobileGame() {
    if (retryInProgress) {
        console.log('다시 시작 진행 중...');
        return;
    }
    
    retryInProgress = true;
    console.log('게임 다시 시작');
    
    if (mobileGameState.timerInterval) {
        clearInterval(mobileGameState.timerInterval);
        mobileGameState.timerInterval = null;
    }
    
    mobileGameState.heroHP = 100;
    mobileGameState.heroMaxHP = 100;
    mobileGameState.monsterHP = 100;
    mobileGameState.monsterMaxHP = 100;
    mobileGameState.currentFloor = 1;
    mobileGameState.combo = 0;
    mobileGameState.maxCombo = 0;
    mobileGameState.potions = 3;
    mobileGameState.isBattleActive = true;
    mobileGameState.isProcessing = false;
    mobileGameState.timer = 10.0;
    
    const resultScreen = document.getElementById('result-screen');
    if (resultScreen) {
        resultScreen.style.display = 'none';
    }
    
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.classList.add('screen-shake');
        setTimeout(() => {
            gameContainer.classList.remove('screen-shake');
        }, 500);
    }
    
    setTimeout(() => {
        updateMobileMonster();
        
        updateMonsterSpeech('welcome');
        
        setTimeout(() => {
            generateMobileQuestion();
            retryInProgress = false;
            gameStartInProgress = false;
        }, 1000);
    }, 300);
}

// UI 업데이트
function updateMobileUI() {
    const heroHpPercent = (mobileGameState.heroHP / mobileGameState.heroMaxHP) * 100;
    const monsterHpPercent = (mobileGameState.monsterHP / mobileGameState.monsterMaxHP) * 100;
    
    const heroHpFill = document.getElementById('hero-hp-fill');
    const monsterHpFill = document.getElementById('monster-hp-fill');
    
    if (heroHpFill) {
        heroHpFill.style.width = `${heroHpPercent}%`;
        if (heroHpPercent < 30) {
            heroHpFill.classList.add('vibrate');
        } else {
            heroHpFill.classList.remove('vibrate');
        }
    }
    
    if (monsterHpFill) {
        monsterHpFill.style.width = `${monsterHpPercent}%`;
    }
    
    const heroHpText = document.getElementById('hero-hp-text');
    const monsterHpText = document.getElementById('monster-hp-text');
    
    if (heroHpText) {
        heroHpText.textContent = `${mobileGameState.heroHP}/${mobileGameState.heroMaxHP}`;
    }
    
    if (monsterHpText) {
        monsterHpText.textContent = `${Math.max(0, mobileGameState.monsterHP)}/${mobileGameState.monsterMaxHP}`;
    }
    
    const heroHpValue = document.getElementById('hero-hp-value');
    const comboValue = document.getElementById('combo-value');
    const potionCount = document.getElementById('potion-count');
    
    if (heroHpValue) heroHpValue.textContent = mobileGameState.heroHP;
    if (comboValue) comboValue.textContent = mobileGameState.combo;
    if (potionCount) potionCount.textContent = mobileGameState.potions;
    
    if (comboValue) {
        if (mobileGameState.combo >= 5) {
            comboValue.style.color = '#ff4444';
            comboValue.style.textShadow = '0 0 15px rgba(255, 68, 68, 1)';
            comboValue.classList.add('vibrate');
        } else if (mobileGameState.combo >= 3) {
            comboValue.style.color = '#ffd700';
            comboValue.style.textShadow = '0 0 12px rgba(255, 215, 0, 0.8)';
            comboValue.classList.remove('vibrate');
        } else {
            comboValue.style.color = '#ffd700';
            comboValue.style.textShadow = 'none';
            comboValue.classList.remove('vibrate');
        }
    }
}

// 데미지 효과 표시
function showDamageEffect(amount, target, type = 'damage') {
    const popup = document.getElementById('damage-popup');
    if (!popup) return;
    
    if (type === 'heal') {
        popup.textContent = `+${amount}`;
        popup.style.color = '#4ecdc4';
        popup.style.textShadow = '0 0 20px rgba(78, 205, 196, 1), 0 3px 6px rgba(0, 0, 0, 0.9)';
    } else if (target === 'monster') {
        popup.textContent = `-${amount}`;
        popup.style.color = '#ffd700';
        popup.style.textShadow = '0 0 20px rgba(255, 215, 0, 1), 0 3px 6px rgba(0, 0, 0, 0.9)';
    } else {
        popup.textContent = `-${amount}`;
        popup.style.color = '#ff4444';
        popup.style.textShadow = '0 0 20px rgba(255, 68, 68, 1), 0 3px 6px rgba(0, 0, 0, 0.9)';
        
        const hitEffect = document.getElementById('hit-effect');
        if (hitEffect) {
            hitEffect.style.animation = 'none';
            setTimeout(() => {
                hitEffect.style.animation = 'hitFlash 0.4s ease-out forwards';
            }, 10);
        }
    }
    
    popup.style.animation = 'none';
    setTimeout(() => {
        popup.style.animation = 'damagePopup 1s ease-out forwards';
    }, 10);
}

// 콤보 효과 표시
function showComboEffect() {
    const comboEffect = document.getElementById('combo-effect');
    if (!comboEffect) return;
    
    comboEffect.textContent = `${mobileGameState.combo} COMBO!`;
    comboEffect.style.animation = 'none';
    
    setTimeout(() => {
        comboEffect.style.animation = 'comboFloat 1.2s ease-out forwards';
    }, 10);
}

// 사운드 재생
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        try {
            sound.currentTime = 0;
            sound.play().catch(e => {
                // 오류 무시
            });
        } catch (e) {
            // 오류 무시
        }
    }
}

// 빠른 초기화 함수
function quickInitialize() {
    console.log('빠른 초기화 시작');
    
    if (typeof questionsData === 'undefined') {
        console.log('기본 문제 데이터 생성');
        window.questionsData = {
            '민법': [
                { question: "민법상 20세 미만의 미성년자는 법정대리인의 동의 없이 계약을 체결할 수 없다. (정답: O)", answer: "O" },
                { question: "특허권의 존속기간은 출원일로부터 20년이다. (정답: O)", answer: "O" },
                { question: "상표권은 등록 없이도 사용만으로 권리가 발생한다. (정답: X)", answer: "X" },
                { question: "실용신안권의 존속기간은 출원일로부터 10년이다. (정답: O)", answer: "O" },
                { question: "디자인권은 등록 후 15년간 보호된다. (정답: O)", answer: "O" }
            ]
        };
    }
    
    setTimeout(() => {
        if (!gameInitialized) {
            initMobileGame();
        }
    }, 50);
}

// DOM 로드 완료 시 게임 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료');
    
    quickInitialize();
});

// iOS 최적화
if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    document.addEventListener('touchmove', function(e) {
        if (e.scale !== 1) {
            e.preventDefault();
        }
    }, { passive: false });
}
