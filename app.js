const pageContents = [] // 데이터를 담고 있는 배열
const numOfData = 120 // 전체 리스트 수
const limit = 4 // 페이지당 보여줄 리스트 수
const numOfBtns = 5 // 페이지당 보여줄 버튼 수 
const totalNumOfBtns = Math.ceil(numOfData/limit) // 총 버튼수
let offset = 0, btnOffset = 0

const contents = document.getElementById('contents')
const pageBtns = document.getElementById('page-btns')

// 버튼 생성하기
function buildBtn(contents){
  const btn = document.createElement('button')
  btn.className = 'page-btn'
  btn.innerText = contents
  return btn 
}

// 화면에 페이지네이션 버튼 보여주기
function showPaginationBtns(pageBtns, btnOffset, numOfBtns){
  pageBtns.innerHTML = ''
  if(btnOffset > 0){
    pageBtns.appendChild(buildBtn("<"))
  }

  for(let i=btnOffset;i<btnOffset+numOfBtns;i++){
    if(i >= 0 && i < totalNumOfBtns){
      pageBtns.appendChild(buildBtn(i+1))
    }
  }
  if(btnOffset + numOfBtns < totalNumOfBtns){
    console.log(btnOffset, numOfBtns, totalNumOfBtns)
    console.log(btnOffset, numOfBtns)
    pageBtns.appendChild(buildBtn(">"))
  }
}

function showList(pageContents, offset, limit, contents){
  contents.innerHTML = '' // 화면 초기화
  for(let i=offset; i<offset+limit; i++){
    const listItem = pageContents[i]

    if(listItem){
      contents.innerHTML += `
                <div id=${listItem.id} class='list-item'>
                    <h3>${listItem.name} (${listItem.id})</h3>
                    <h3>${listItem.age}</h3>
                </div>
            `
    }
  }
}

// 리스트 배열 만들기
for(let i=0;i<numOfData;i++){
    pageContents.push({ name: 'sunrise', age: 20, id: i })
}
console.log(pageContents)


function changePage(e){
    const target = e.target
    if(target.className === 'page-btn'){
        if(target.innerText === '>'){
          btnOffset += numOfBtns
          showPaginationBtns(pageBtns, btnOffset, numOfBtns)
        }else if(target.innerText === '<'){
          btnOffset -= numOfBtns
          showPaginationBtns(pageBtns, btnOffset, numOfBtns)
        }else{
          const indexSelected = parseInt(target.innerText) - 1
          offset = limit * indexSelected // 콘텐츠 시작점(오프셋) = (페이지번호 - 1) x 페이지당 보여줄 갯수
          showList(pageContents, offset, limit, contents) // 클릭한 페이지 로딩
        }
    }
}


showList(pageContents, offset, limit, contents) 
showPaginationBtns(pageBtns, btnOffset, numOfBtns)

pageBtns.addEventListener('click', changePage)