# wanted-codestates-project-3
배포링크 : https://juo1221.github.io/wanted-codestates-project-3/

# 기술 스택

- HTML
- SCSS
- Vanilla Js
- webpack 5

# Vanilla Js를 사용한 이유

프레임워크나 라이브러리를 사용하지 않더라도 충분히 구현할 수 있는 과제라고 판단했기 때문에 MVC,옵저버,싱글톤패턴을 이용한 js로 구현했습니다. 

# 이용방법

## 셀렉터

- #### 검색

  ![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/79268108/160289867-ed5de48f-426c-4097-b06c-48e9408759bb.gif)

  	- 입력값이 아이템의 타이틀 중 일부와 일치한다면 enter 후 검색 결과로 표시. 
  	
  	- 공백을 입력 후 enter 하면 이용할 수 있는 데이터로 초기화.
  	
  	- 존재하지 않는 데이터를 입력할 경우 데이터 없음을 표시하고 0.5초 후 제거.


  

  

- #### 이동

  ![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/79268108/160290262-f3206d7e-cdd5-45bf-b084-e183c0fbb662.gif)

## 소메뉴

- 기능

  ![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/79268108/160296785-d811b3fc-95d0-4545-8c72-f5aef51f021e.gif)

  - Shift 클릭은 처음과 마지막을 포함한 모든 아이템을 클릭 처리.
  - Command or ctrl 클릭은 해당 아이템을 클릭 처리.
  - 일반 클릭 시 하나의 아이템만 클릭 처리.



# 어려웠던 점

1. 기존 코드를 다시 mvc로 분리하는 부분.

2. 검색 구현 시 공백을 입력 후 enter 하면 이용할 수 있는 데이터로 초기화하는 부분과 경고 메시지를 띄우면 0.5초 뒤 다시 데이터가 갱신되는 것을 구현하는 부분. 

3. 비동기 처리.

   <img width="664" alt="스크린샷 2022-03-25 오전 7 01 55" src="https://user-images.githubusercontent.com/79268108/160299385-ce07ab0a-b246-488d-a3d9-26123808194d.png">

   <img width="314" alt="스크린샷 2022-03-25 오전 6 54 30" src="https://user-images.githubusercontent.com/79268108/160299404-2c4e1fc6-51ed-47f4-b784-e280ad3f332f.png">

   <img width="863" alt="스크린샷 2022-03-25 오전 7 02 59" src="https://user-images.githubusercontent.com/79268108/160299435-775e8c93-c89d-46b9-a48a-b004d45f4ace.png">

   base를 호출하면 HomeModel에서 list에 데이터를 담게 되는데 model을 출력해 보면 데이터를 받아오지 않음을 알 수 있다. 



# 해결 과정

1. 먼저 모델 => 뷰 => 컨트롤러 순으로 구현을 시도했다. 하지만 뷰 없이 모델을 먼저 정의하는 것은 힘들다고 판단을 했고 뷰를 최대한 정의한 후 모델을 추가하는 것으로 방향을 잡았다.
   뷰 작성 => 뷰에서 사용할 모델 작성 => 뷰에서 사용할 액션 정의 => 컨트롤러 구현 순으로 mvc를 구성해갔다.

   

2. 코드![code](https://user-images.githubusercontent.com/79268108/160298791-139bf73e-8213-4c2a-899e-0639ab1782f4.png)

   - 검색하면 항상 데이터를 갱신한다.
   - available 데이터와 selected 데이터를 비교해야 하기 때문에 smodelList를 받아오고 모두  정렬한다. 
   - 입력된 값이 공백이면 처음 로드한 데이터를 불러오고, 필터링 된 데이터가 있으면 필터링 된 데이터를 보여준다. 
   - 필터링 된 데이터가 없을 경우 사용자에게 경고 표시를 하기 위해 먼저 렌더링 시킨다. 
   - 렌더링이 끝난 후 0.5초 뒤 데이터를 빈 배열로 갱신하게 되면 오류 메시지를 0.5초만 보여줄 수 있다. 
     
     

3. 비동기 처리하기.

   생성자에서 비동기 처리를 할 경우 발생하는 문제임을 알게 됐는데 정확하게 이해하지 못했다. 문제는 해결했지만 정확한 문제 원인을 알기 위해 추가 학습이 필요하다. 

   ![code](https://user-images.githubusercontent.com/79268108/160299775-96632b27-7295-4b17-b310-ddd96189129b.png)

   해당 문제는 app에서 데이터를 로딩하는 것으로 해결했다. 즉 모델을 생성함과 동시에 데이터를 받아오는 형태가 아니라, 모델이 만들어진 후 데이터를 받아오는 것으로 코드를 고쳤다. 

