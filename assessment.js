{
  'use strict'

  const userNameInput = document.getElementById('user-name')
  const assessmentButton = document.getElementById('assessment')
  const resultDevided = document.getElementById('result-area')
  const tweetDivided = document.getElementById('tweet-area')

  /**
    * 指定した要素の子どもを全て削除する
    * @param {HTMLElement} element HTMLの要素
    */
  const removeAllChildren = (element) => {
    while(element.firstChild) {
      element.removeChild(element.firstChild)
    }
  }
  assessmentButton.onclick = () => {
    const userName = userNameInput.value
    if(userName.length == 0) {
      return
    }

    // 診断結果エリアの作成
    removeAllChildren(resultDevided)
    const header = document.createElement('h3')
    header.innerText = '診断結果'
    resultDevided.appendChild(header)

    const paragraph = document.createElement('p')
    paragraph.innerText = assessment(userName)
    resultDevided.appendChild(paragraph)

    // ツイートエリアの作成
    removeAllChildren(tweetDivided)
    const anchor = document.createElement('a')
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D'
    anchor.setAttribute('href', hrefValue)
    anchor.dataset.text = assessment(userName)
    anchor.dataset.url = 'https://mktoho12.github.io/assessment/assessment.html'
    anchor.dataset.related = 'mktoho12'
    anchor.dataset.lang = 'ja'
    anchor.dataset.size = 'large'
    anchor.className = 'twitter-hashtag-button'
    anchor.innerText = 'Tweet #%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D'
    tweetDivided.appendChild(anchor)
    
    twttr.widgets.load()
  }

  userNameInput.onkeydown = (event) => {
    if(event.keyCode == 13) {
      assessmentButton.onclick()
    }
  }

  const answers = `
  {userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。
  {userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。
  {userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。
  {userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。
  {userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。
  {userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。
  {userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。
  {userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。
  {userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。
  {userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。
  {userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。
  {userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。
  {userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。
  {userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。
  {userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。
  {userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。
  `.trim().split(/\n/).map((answer) => {return answer.trim()})

  /**
    * 名前の文字列を渡すと診断結果を返す関数
    * @param {string} userName ユーザーの名前
    * @return {string} 診断結果
    */
  const assessment = (userName) => {
    const index = userName.split('').map((c) => {
      return c.charCodeAt()
    }).reduce((l,r) => {
      return l+r
    }, 0) % answers.length

    return answers[index].replace(/{userName}/g, userName)
  }

/*
  console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  )
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '同じ名前に対し異なる診断結果が出力されています。'
  )
*/
}