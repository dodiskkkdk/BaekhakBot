// variables
let userName = '학우';
let state = 'SUCCESS';
let counter = 0;

// functions
function Message(arg) {
	this.text = arg.text;
	this.message_side = arg.message_side;

	this.draw = function(_this) {
		return function() {
			let $message;
			$message = $($('.message_template').clone().html());
			$message.addClass(_this.message_side).find('.text').html(_this.text);
			$('.messages').append($message);

			return setTimeout(function() {
					return $message.addClass('appeared');
			}, 0);
		};
	}(this);
	return this;
}

function getMessageText() {
	let $message_input;
	$message_input = $('.message_input');
	return $message_input.val();
}

function sendMessage(text, message_side) {
	let $messages, message;
	$('.message_input').val('');
	$messages = $('.messages');
	message = new Message({
		text: text,
		message_side: message_side
	});
	message.draw();
	$messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
}


function sendMessageImg(text, message_side) {
	let $messages, message;
	$('.message_input').val('');
	$messages = $('.messages');
	message = new Message({
		text: text,
		message_side: message_side
       // img:
    });
	message.draw();
	$messages.animate({ scrollTop: $messages.prop('scrollHeight')  }, 300);
}

function greet() {
	setTimeout(function() {
		return sendMessage("백학봇 임시 데모에 오신걸 환영합니다.", 'left');
	}, 1000);

	//setTimeout(function () {
	//    return sendMessage("사용할 닉네임을 알려주세요.", 'left');
	//}, 2000);
}

function onClickAsEnter(e) {
	if (e.keyCode == 13) {
		onSendButtonClicked()
	}
}

function setUserName(username) {

	if (username != null && username.replace(" ", "" !== "")) {
		setTimeout(function() {
			return sendMessage("반갑습니다." + username + "님. 닉네임이 설정되었습니다.", 'left');
		}, 1000);
		return username;

	} else {
		setTimeout(function() {
			return sendMessage("올바른 닉네임을 이용해주세요.", 'left');
		}, 1000);

		return null;
	}
}

function requestChat(messageText, url_pattern) {
	$.ajax({
		url: "http://127.0.0.1:9080/" + url_pattern + '/' + userName + '/' + messageText,
		type: "GET",
		dataType: "json",
		success: function(data) {
			state = data['state'];

			if (state === 'SUCCESS') {
				return sendMessage(data['answer'], 'left');
			} else if (state === 'REQUIRE_LOCATION') {
				return sendMessage('어느 지역을 알려드릴까요?', 'left');
			} else {
				return sendMessage('죄송합니다. 무슨말인지 잘 모르겠어요.', 'left');
			}
		},

		error: function(request, status, error) {
			console.log(error);

			return sendMessage('죄송합니다. 서버 연결에 실패했습니다.', 'left');
		}
	});
}

function onSendButtonClicked() {
	let messageText = getMessageText();
	sendMessage(messageText, 'right');

	if (userName == null) {
		userName = setUserName(messageText);

	} else {
		if (messageText.includes('안녕')) {
			counter == 0;
			setTimeout(function() {
				return sendMessage("안녕하세요. 저는 백학봇 데모입니다.", 'left');
			}, 1000);
		} else if (messageText.includes('고마워')) {
			//counter == 0;
			setTimeout(function() {
				return sendMessage("천만에요. 더 물어보실 건 없나요?", 'left');
			}, 1000);
		} else if (messageText.includes('지름길')) {
			setTimeout(function() {
				return sendMessage("답변", 'left');
			}, 1000);

		} else if (messageText.includes('시험') || messageText.includes('시험기간')
		            || messageText.includes('기말고사')) {
			setTimeout(function() {
				return sendMessage("1학기 기말고사 기간은 6.10(목) ~ 6.16(수)입니다 :)", 'left');
			}, 1000);

		} else if (messageText.includes('결석') || messageText.includes('출석 기준')) {
			setTimeout(function() {
				return sendMessage("수업시간의 3/4이상을 출석하지 않을 시 시험 응시자격이 주어지지 않고 F학점으로 처리됩니다.", 'left');
			}, 1000);
		}

		else if (messageText.includes('셔틀버스')) {
			setTimeout(function() {
				a = sendMessageImg("<img src = \"https://www3.chosun.ac.kr/preview/result/temp_1622721274792100.files/temp_1622721274792100.jpg\">", 'left');
				b = sendMessageImg("<img src = \"https://www3.chosun.ac.kr/preview/result/temp_1622721274885100.files/temp_1622721274885100.jpg\">", 'left');
				c = sendMessageImg("<img src = \"https://www3.chosun.ac.kr/preview/result/temp_1622721274199100.files/temp_1622721274199100.jpg\">", 'left');
				return [a,b,c];
			}, 1000);
		}

		else if (messageText.includes('본관') && messageText.includes('강의실')) {
			setTimeout(function() {
				return sendMessageImg("<img src = \"https://www3.chosun.ac.kr/preview/result/temp_1622721274806100.files/temp_1622721274806100.jpg\" width = \"500\" height = \"800\">", 'left');
			}, 1000);
		}

		else if ((messageText.includes('중앙도서관') && messageText.includes('이용시간')) ||
			(messageText.includes('중도') && messageText.includes('이용시간'))) {
			setTimeout(function() {
				return sendMessageImg("<img src = \"http://library.chosun.ac.kr/upload/userfiles/images/%EC%A4%91%EC%95%99%EB%8F%84%EC%84%9C%EA%B4%80%20%EC%9A%B4%EC%98%81%20%EA%B3%B5%EC%A7%80(2021_3_2_)001.png\" >", 'left');
			}, 1000);
		}

		else if ((messageText.includes('중앙도서관') && messageText.includes('학생증')) ||
			(messageText.includes('중도') && messageText.includes('학생증')) ||
			(messageText.includes('중앙도서관') && messageText.includes('입장')) ||
			(messageText.includes('중도') && messageText.includes('입장'))) {
			setTimeout(function() {
				return sendMessage("학생증을 찍거나 없는 경우  '조선대학교 모바일 좌석 배정' 어플을 이용해서 입장해주세요 .", 'left');
			}, 1000);
		}
		else if ((messageText.includes('중앙도서관') && messageText.includes('서점')) || (messageText.includes('중도') && messageText.includes('서점')) ||
			messageText.includes('서점')) {
			setTimeout(function() {
				return sendMessage("운영 시간은 오전 9시부터 오후 6시까지입니다.", 'left');
			}, 1000);
		}

		else if (messageText.includes('윈도우10제품키') || messageText.includes('윈도우 10 제품키') ||
			messageText.includes('윈도우 제품키')) {
			setTimeout(function() {
				return sendMessage("<a href = \"https://onthehub.com/search\" target = \"_blank\">" +
				"1. 링크에 들어가서 학교를 찾고 로그인" +
				"<br>" +
				"2. 로그인하면 화면에 떠있는 윈도우10제품 확인" +
                "<br>" +
                "3. 카트에 추가하고 카트로 가기" +
                "<br>" +
                "4. 체크아웃 누르고 절차 따르기" +
                "<br>" +
                "5. 제품키가 뜨고 그 밑에 get start 누르면 사용 방법 확인", 'left');
			}, 1000);
		}

		else if (messageText.includes('오피스365') || messageText.includes('오피스 365') ||
			messageText.includes('파워포인트')) {
			setTimeout(function() {
				return sendMessage("<a href = \"https://www.microsoft.com/ko-kr/education/products/office\" target = \"_blank\">" +
				"1. 링크 들어가서 학교 이메일 입력하고 계정 등록하기" +
                "<br>" +
                "2. 이후에 오피스 365 다운하거나 기존에 다운로드 된 엑셀, 파워포인트 실행하고 이메일 주소로 정품인증 해주면 정품오피스 365 사용 가능!", 'left');
			}, 1000);
		}

		else if (messageText.includes('몇분') || messageText.includes('몇분컷') ||
			messageText.includes('몇분 컷')) {
			setTimeout(function() {
				return sendMessage("좀 더 정확한 답변을 위해 'OO에서 OO' 형식으로 질문해주세요" +
				"<br>" +
				"ex) 본관에서 체대", 'left');
			}, 1000);
		}

		else if (messageText.includes('본관에서')) {
			setTimeout(function() {
				return sendMessage("본관 북쪽-공대1호관&nbsp&nbsp&nbsp도보 23분" +
				"<br>" +
				"본관 북쪽-사범대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 5분" +
				"<br>" +
				"본관 북쪽-경상대학/법과대학&nbsp&nbsp&nbsp도보 9분" +
				"<br>" +
				"본관 북쪽-공대2호관&nbsp&nbsp&nbsp도보 11분" +
				"<br>" +
				"본관 북쪽-IT융합대학&nbsp&nbsp&nbsp도보 12분" +
				"<br>" +
				"본관 북쪽-미술대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 12분" +
				"<br>" +
				"본관 북쪽-자연대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 20분 " +
				"<br>" +
				"본관 북쪽-항공우주공학과&nbsp&nbsp&nbsp도보 20분" +
				"<br>" +
				"본관 북쪽-의과대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 20분 " +
				"<br>" +
				"본관 북쪽-약학대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 22분 " +
				"<br>" +
				"본관 북쪽-체육대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 25분 " +
				"<br>" + "<br>" +
				"본관 남쪽-경상대학/법과대학&nbsp&nbsp&nbsp도보 5분 " +
				"<br>" +
				"본관 남쪽-공대2호관&nbsp&nbsp&nbsp도보 8분" +
				"<br>" +
				"본관 남쪽-IT융합대학&nbsp&nbsp&nbsp도보 9분" +
				"<br>" +
				"본관 남쪽-미술대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 13분" +
				"<br>" +
				"본관 남쪽-사범대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 13분" +
				"<br>" +
				"본관 남쪽-항공우주공학과&nbsp&nbsp&nbsp도보 16분" +
				"<br>" +
				"본관 남쪽-의과대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 16분" +
				"<br>" +
				"본관 남쪽-공대1호관&nbsp&nbsp&nbsp도보 23분" +
				"<br>" +
				"본관 남쪽-체육대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 20분" +
				"<br>" +
				"본관 남쪽-자연대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 20분" +
				"<br>" +
				"본관 남쪽-약학대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 22분", 'left');
			}, 1000);
		}

		else if (messageText.includes('사범대에서') || messageText.includes('사대에서') ||
			messageText.includes('사범대학에서')) {
			setTimeout(function() {
				return sendMessage("사범대학-공대1공학&nbsp&nbsp&nbsp도보 25분" +
				"<br>" +
				"사범대학-체육대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 20분" +
				"<br>" +
				"사범대학-IT융합대학&nbsp&nbsp&nbsp도보 13분" +
				"<br>" +
				"사범대학-본관 북쪽&nbsp&nbsp&nbsp&nbsp&nbsp도보 5분" +
				"<br>" +
				"사범대학-본관 남쪽&nbsp&nbsp&nbsp&nbsp&nbsp도보 12분" +
				"<br>" +
				"사범대학-미술대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 13분" +
				"<br>" +
				"사범대학-자연대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 23분" +
				"<br>" +
				"사범대학-공대2호관&nbsp&nbsp&nbsp도보 16분" +
				"<br>" +
				"사범대학-경상대학/법과대학&nbsp&nbsp도보 15분" +
				"<br>" +
				"사범대학-항공우주공학과&nbsp&nbsp&nbsp&nbsp&nbsp도보 24분" +
				"<br>" +
				"사범대학-의과대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 20분" +
				"<br>" +
				"사범대학-약학대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 23분", 'left');
			}, 1000);
		}

		else if (messageText.includes('미술대학에서') || messageText.includes('미대에서') ||
			messageText.includes('미술대에서')) {
			setTimeout(function() {
				return sendMessage("미술대학-공대1공학&nbsp&nbsp&nbsp도보 12분" +
				"<br>" +
				"미술대학-체육대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 10분" +
				"<br>" +
				"미술대학-IT융합대학&nbsp&nbsp&nbsp도보 15분" +
				"<br>" +
				"미술대학-본관 북쪽&nbsp&nbsp&nbsp&nbsp&nbsp도보 15분" +
				"<br>" +
				"미술대학-본관 남쪽&nbsp&nbsp&nbsp&nbsp&nbsp도보 12분" +
				"<br>" +
				"미술대학-사범대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 13분" +
				"<br>" +
				"미술대학-자연대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 12분" +
				"<br>" +
				"미술대학-공대2호관&nbsp&nbsp&nbsp도보 15분" +
				"<br>" +
				"미술대학-경상대학/법과대학&nbsp&nbsp도보 18분" +
				"<br>" +
				"미술대학-항공우주공학과&nbsp&nbsp&nbsp&nbsp&nbsp도보 18분" +
				"<br>" +
				"미술대학-의과대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 11분" +
				"<br>" +
				"미술대학-약학대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 13분", 'left');
			}, 1000);
		}

		else if (messageText.includes('경상대에서') || messageText.includes('경상대학에서') ||
			messageText.includes('상대에서') || messageText.includes('법학대학에서') ||
			messageText.includes('법대에서')) {
			setTimeout(function() {
				return sendMessage("경상대학/법과대학-공대1공학&nbsp&nbsp&nbsp도보 25분" +
				"<br>" +
				"경상대학/법과대학-체육대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 20분" +
				"<br>" +
				"경상대학/법과대학-IT융합대학&nbsp&nbsp&nbsp도보 7분" +
				"<br>" +
				"경상대학/법과대학-본관 북쪽&nbsp&nbsp&nbsp&nbsp&nbsp도보 10분" +
				"<br>" +
				"경상대학/법과대학-본관 남쪽&nbsp&nbsp&nbsp&nbsp&nbsp도보 5분" +
				"<br>" +
				"경상대학/법과대학-사범대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 14분" +
				"<br>" +
				"경상대학/법과대학-자연대학&nbsp&nbsp&nbsp&nbsp도보 19분" +
				"<br>" +
				"경상대학/법과대학-공대2호관&nbsp&nbsp&nbsp도보 7분" +
				"<br>" +
				"경상대학/법과대학-미술대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 14분" +
				"<br>" +
				"경상대학/법과대학-항공우주공학과&nbsp&nbsp&nbsp도보 15분" +
				"<br>" +
				"경상대학/법과대학-의과대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 15분" +
				"<br>" +
				"경상대학/법과대학-약학대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 24분", 'left');
			}, 1000);
		}

		else if (messageText.includes('IT융합대학에서') || messageText.includes('IT에서') ||
			messageText.includes('아융에서') || messageText.includes('아이티에서')) {
			setTimeout(function() {
				return sendMessage("IT융합대학-공대1공학&nbsp&nbsp&nbsp도보 21분" +
				"<br>" +
				"IT융합대학-체육대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 15분" +
				"<br>" +
				"IT융합대학-미술대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 15분" +
				"<br>" +
				"IT융합대학-본관 북쪽&nbsp&nbsp&nbsp&nbsp도보 13분" +
				"<br>" +
				"IT융합대학-본관 남쪽&nbsp&nbsp&nbsp&nbsp도보 10분" +
				"<br>" +
				"IT융합대학-사범대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 19분" +
				"<br>" +
				"IT융합대학-자연대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 15분" +
				"<br>" +
				"IT융합대학-공대2호관&nbsp&nbsp&nbsp도보 3분" +
				"<br>" +
				"IT융합대학-경상대학/법과대학&nbsp&nbsp도보 7분" +
				"<br>" +
				"IT융합대학-항공우주공학과&nbsp&nbsp&nbsp&nbsp&nbsp도보 10분" +
				"<br>" +
				"IT융합대학-의과대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 10분" +
				"<br>" +
				"IT융합대학-약학대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 20분", 'left');
			}, 1000);
		}

		else if (messageText.includes('공대에서') || messageText.includes('공과대학에서') ||
			messageText.includes('공대2호관에서') || messageText.includes('공대1호관에서') ||
			messageText.includes('1공에서') || messageText.includes('2공에서')) {
			setTimeout(function() {
				return sendMessage("공대1공학-약학대학&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp도보 5분" +
				"<br>" +
				"공대1공학관-공대2공학&nbsp&nbsp&nbsp도보 20분" +
				"<br>" +
				"공대1공학관-미술대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 13분" +
				"<br>" +
				"공대1공학관-본관 북쪽&nbsp&nbsp&nbsp&nbsp도보 25분" +
				"<br>" +
				"공대1공학관-본관 남쪽&nbsp&nbsp&nbsp&nbsp도보 27분" +
				"<br>" +
				"공대1공학관-사범대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 30분" +
				"<br>" +
				"공대1공학관-체육대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 8분" +
				"<br>" +
				"공대1공학관-IT융합대학&nbsp&nbsp&nbsp도보 23분" +
				"<br>" +
				"공대1공학관-경상대학/법과대학&nbsp&nbsp&nbsp도보 29분" +
				"<br>" +
				"공대1공학관-항공우주공학과&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp도보 20분" +
				"<br>" +
				"공대1공학관-의과대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 13분" +
				"<br>" +
				"공대1공학관-자연대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 14분" +
				"<br>" + "<br>" +
				"공대2공학관-공대1공학&nbsp&nbsp&nbsp도보 20분" +
				"<br>" +
				"공대2공학관-체육대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 12분" +
				"<br>" +
				"공대2공학관-미술대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 15분" +
				"<br>" +
				"공대2공학관-본관 북쪽&nbsp&nbsp&nbsp&nbsp도보 13분" +
				"<br>" +
				"공대2공학관-본관 남쪽&nbsp&nbsp&nbsp&nbsp도보 10분" +
				"<br>" +
				"공대2공학관-사범대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 18분" +
				"<br>" +
				"공대2공학관-자연대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 13분" +
				"<br>" +
				"공대2공학관-IT융합대학&nbsp&nbsp&nbsp&nbsp도보 3분" +
				"<br>" +
				"공대2공학관-경상대학/법과대학&nbsp&nbsp도보 8분" +
				"<br>" +
				"공대2공학관-항공우주공학과&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp도보 7분" +
				"<br>" +
				"공대2공학관-의과대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 9분" +
				"<br>" +
				"공대2공학관-약학대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 16분", 'left');
			}, 1000);
		}

		else if (messageText.includes('체육대학에서') || messageText.includes('체대에서') ||
			messageText.includes('체육대에서')) {
			setTimeout(function() {
				return sendMessage("체육대학-공대1공학&nbsp&nbsp&nbsp도보 8분" +
				"<br>" +
				"체육대학-공대2공학&nbsp&nbsp&nbsp도보 13분" +
				"<br>" +
				"체육대학-미술대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 9분" +
				"<br>" +
				"체육대학-본관 북쪽&nbsp&nbsp&nbsp&nbsp도보 20분" +
				"<br>" +
				"체육대학-본관 남쪽&nbsp&nbsp&nbsp&nbsp도보 20분" +
				"<br>" +
				"체육대학-사범대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 25분" +
				"<br>" +
				"체육대학-자연대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 5분" +
				"<br>" +
				"체육대학-IT융합대학&nbsp&nbsp&nbsp도보 15분" +
				"<br>" +
				"체육대학-경상대학/법과대학&nbsp&nbsp도보 21분" +
				"<br>" +
				"체육대학-항공우주공학과&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp도보 12분" +
				"<br>" +
				"체육대학-의과대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 3분" +
				"<br>" +
				"체육대학-약학대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 5분", 'left');
			}, 1000);
		}

		else if (messageText.includes('자연대학에서') || messageText.includes('자연과학대학에서') ||
			messageText.includes('자연대에서') || messageText.includes('자과대에서') ||
			messageText.includes('자대에서')) {
			setTimeout(function() {
				return sendMessage("자연대학-공대1공학&nbsp&nbsp&nbsp도보 13분" +
				"<br>" +
				"자연대학-공대2공학&nbsp&nbsp&nbsp도보 14분" +
				"<br>" +
				"자연대학-미술대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 12분" +
				"<br>" +
				"자연대학-본관 북쪽&nbsp&nbsp&nbsp&nbsp도보 24분" +
				"<br>" +
				"자연대학-본관 남쪽&nbsp&nbsp&nbsp&nbsp도보 23분" +
				"<br>" +
				"자연대학-사범대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 26분" +
				"<br>" +
				"자연대학-체육대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 5분" +
				"<br>" +
				"자연대학-IT융합대학&nbsp&nbsp도보 15분" +
				"<br>" +
				"자연대학-경상대학/법과대학&nbsp&nbsp도보 21분" +
				"<br>" +
				"자연대학-항공우주공학과&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp도보 12분" +
				"<br>" +
				"자연대학-의과대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 3분" +
				"<br>" +
				"자연대학-약학대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 10분", 'left');
			}, 1000);
		}


		else if (messageText.
		includes('약학대학에서') || messageText.includes('약학대에서') ||
			messageText.includes('약대1호관에서') || messageText.includes('약대에서') ||
			messageText.includes('약대2호관에서') || messageText.includes('약대3호관에서')) {
			setTimeout(function() {
				return sendMessage("약학대학-공대1공학&nbsp&nbsp&nbsp도보 5분" +
				"<br>" +
				"약학대학-공대2공학&nbsp&nbsp&nbsp도보 20분"+
				"<br>" +
				"약학대학-미술대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 13분" +
				"<br>" +
				"약학대학-본관 북쪽&nbsp&nbsp&nbsp&nbsp도보 25분" +
				"<br>" +
				"약학대학-본관 남쪽&nbsp&nbsp&nbsp&nbsp도보 25분" +
				"<br>" +
				"약학대학-사범대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 27분" +
				"<br>" +
				"약학대학-체육대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 5분" +
				"<br>" +
				"약학대학-IT융합대학&nbsp&nbsp도보 22분" +
				"<br>" +
				"약학대학-경상대학/법과대학&nbsp&nbsp도보 27분" +
				"<br>" +
				"약학대학-항공우주공학과&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp도보 19분" +
				"<br>" +
				"약학대학-의과대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 10분" +
				"<br>" +
				"약학대학-자연대학&nbsp&nbsp&nbsp&nbsp&nbsp도보 10분", 'left');
			}, 1000);
		}

		else if (messageText.includes('매점')) {
			setTimeout(function() {
				return sendMessage(
				"IT융합대학&nbsp&nbsp5층" +
				"<br>" +
				"미술대학&nbsp&nbsp&nbsp&nbsp2층" +
				"<br>" +
				"체육대학&nbsp&nbsp&nbsp&nbsp자연대쪽 이마트24" +
				"<br>" +
				"자연대학&nbsp&nbsp&nbsp&nbsp지하1층 이마트24" +
				"<br>" +
				"공대 1호관&nbsp&nbsp2층" +
				"<br>" +
				"공대 2호관&nbsp&nbsp지하 1층" +
				"<br>" +
				"사범대학&nbsp&nbsp&nbsp&nbsp&nbsp1층" +
				"<br>" +
                "본관&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp북쪽 4층, 남쪽 3층, 5층" +
				"<br>" +
				"경상대학,법과대학&nbsp&nbsp각 건물 사이 1층", 'left');
			}, 1000);
		}

		else if (messageText.includes('재수강') || messageText.includes('재수강기준')) {
			setTimeout(function() {
				return sendMessage('이전 학점 C+부터 가능하고, 최대 A0까지 받을 수 있습니다.', 'left');
			}, 1000);
		}

		else if (messageText.includes('수강신청')) {
			setTimeout(function() {
				return sendMessage('2021학년도 2학기 수강신청은 2021.08.23. ~ 2021.08.28.입니다.', 'left');
			}, 1000);
		}

		else if (messageText.includes('성적조회') || messageText.includes('성적 조회')) {
			setTimeout(function() {
				return sendMessage("2021학년도 1학기 성적열람 및 정정기간은 2021.06.24. ~ 2021.06.30.입니다 :) " +
				"<br>" +
				"성적조회는 종합정보시스템(wing.chosun.ac.kr) 또는 학교사이트(chosun.ac.kr) 로그인 후, 학사-나의 학사조회- 금학기 성적조회로 조회 가능합니다.", 'left');
			}, 1000);
		}

		else if (messageText.includes('주차장') || messageText.includes('주차요금')) {
			setTimeout(function() {
				return sendMessage("30분 무료 " +
				"<br>" +
				"기본료 600원, 30분 이후 10분당 200원입니다.", 'left');
			}, 1000);
		}

		else if (messageText.includes('와이파이') || messageText.includes('와파')
			|| messageText.includes('교내와이파이')) {
			setTimeout(function() {
				return sendMessage('아이디는 학번 비밀번호는 초기입력시 생년월일, 변경했을 시 종합정보시스템 비밀번호와 동일합니다.', 'left');
			}, 1000);
		}

		else if (messageText.includes('학교 문') || messageText.includes('개방시간')) {
			setTimeout(function() {
				return sendMessage('6시 이후에 잠기며, 잠겼어도 학생증을 지참했을 경우 입장 가능합니다.', 'left');
			}, 1000);
		}

		else if (messageText.includes('교학팀') || messageText.includes('교학팀 운영시간')) {
			setTimeout(function() {
				return sendMessage("운영 시간은 오전 9시부터 오후 5시까지입니다. " +
				"<br>" + "<br>" +
				"각 단과대별 위치를 확인해주세요." +
				"<br>" +
				"외국어대학&nbsp&nbsp본관 4층 북쪽" +
				"<br>" +
				"인문대학&nbsp&nbsp&nbsp&nbsp&nbsp본관 4층 중앙" +
				"<br>" +
				"법과대학&nbsp&nbsp&nbsp&nbsp&nbsp1층" +
				"<br>" +
				"IT융합대학&nbsp&nbsp별관 1층" +
				"<br>" +
				"공대 1호관&nbsp&nbsp2층" +
				"<br>" +
				"공대 2호관&nbsp&nbsp1층" +
				"<br>" +
				"경상대학&nbsp&nbsp&nbsp&nbsp&nbsp2층" +
				"<br>" +
				"자연대학&nbsp&nbsp&nbsp&nbsp&nbsp1층" +
				"<br>" +
				"미술대학&nbsp&nbsp&nbsp&nbsp&nbsp2층" +
				"<br>" +
				"사범대학&nbsp&nbsp&nbsp&nbsp&nbsp3층" +
				"<br>" +
				"체육대학&nbsp&nbsp&nbsp&nbsp&nbsp3층", 'left');
			}, 1000);
		}

		else if (messageText.includes('스마트출석') || messageText.includes('스마트 출석') || messageText.includes('출석') ||
			messageText.includes('전자출석')) {
			setTimeout(function() {
				return sendMessage('HelloLMS 어플을 다운 후, 해당 수업에 들어가 출석란에 출석번호를 입력해주세요.', 'left');
			}, 1000);
		}

		else if (messageText.includes('계절학기') || messageText.includes('하계 계절학기') ||
			messageText.includes('하계계절학기')) {
			setTimeout(function() {
				return sendMessage('하계 계절학기는 2021.07.05(월) ~ 2021.07.23.(금) 입니다.', 'left');
			}, 1000);
		}


		else if (messageText.includes('학식') || messageText.includes('글로벌학사 학식') ||
			messageText.includes('글로벌 학식') || messageText.includes('입석 학식') ||
			messageText.includes('백학 학식') || messageText.includes('백학사 학식')) {
			setTimeout(function() {
				return sendMessage("<a href = \"https://www3.chosun.ac.kr/chosun/608/subview.do\" target = \"_blank\">" +
				"글로벌"+
				"<br>" +
				"<a href = \"https://www3.chosun.ac.kr/chosun/607/subview.do\" target = \"_blank\">" +
				"입석홀" +
				"<br>" +
				"<a href = \"https://www3.chosun.ac.kr/chosun/615/subview.do\" target = \"_blank\">" +
				"백학사", 'left');
			}, 1000);
		}


		else if (messageText.includes('솔마루에') || messageText.includes('솔마루 푸드코트에') ||
			messageText.includes('솔마루 푸드코트') || messageText.includes('솔마루메뉴') ||
			messageText.includes('솔마루') || messageText.includes('솔마루 메뉴')) {
			setTimeout(function() {
				return sendMessage("식당 : 더큰도시락, 중화가정, 제라진, 만권화밥, 석관동떡볶이, 샐러디" +
				"<br>" +
				"운영시간은 방중기간: 10:30 ~ 17:30 (동계방학 운영시간 추후 예정) " +
				"<br>" +
				"평일: 10시 ~ 19시 / 주말 휴업" +
				"<br>" +
				"시험기간: 09시 ~ 20시 입니다.", 'left');
			}, 1000);
		}



		else if (messageText.includes('없어')) {
			//counter == 0;
			setTimeout(function() {
				return sendMessage("그렇군요. 알겠습니다!", 'left');
			}, 1000);



		} else if (state.includes('REQUIRE')) {
			//counter += 1;
			return requestChat(messageText, 'fill_slot');

		} else {
			//counter == 0;
			return requestChat(messageText, 'request_chat');
		}


	}
}
