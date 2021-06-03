from random import randint
import re
from kocrawl.searcher.base_searcher import BaseSearcher


class ChosunSearcher(BaseSearcher):

    def __init__(self):
        self.CSS={
            'google_info': '#TbwUpd NJjxre > #iUh30 Zu0yb tjvcx'
        }
        self.data_dict = {
            # 데이터를 담을 딕셔너리 구조를 정의합니다.
            'context': None
        }

    def _make_query(self, info:str) -> str:
        """
        검색할 쿼리를 만듭니다.
        :param location: 지역
        :param place: 장소
        :return: "지역 장소"로 만들어진 쿼리
        """

        query = ' '.join([info])
        return query

    def search_chosun(self, info:str) -> dict:
        print("run search chosun!")
        """
        네이버 지도 API 에서 지역과 여행지를 검색합니다.
        :param location: 지역
        :param travel: 여행지
        :return: 사용할 내용만 json에서 뽑아서 dictionary로 만듬.
        """

        query = self._make_query(info)
        result = self._bs4_contents_chosun(url=self.url['chosun_search'],
                                    selectors=[self.CSS['google_info']],
                                    search_word_enc=query) # 리턴 값 -> 리스트

        #print(result)


        #result = result['result']
        #random_result = result[max(randint(0, len(result) - 1), 3)]
        # 네이버 지도 검색 결과 중에서 랜덤으로 하나 뽑음
        # 최대치는 3번째 칸에 출력된 결과 까지이며, 너무 뒷쪽 결과는 출력하지 않음

        #self.data_dict['context'].append(result['context'])
        #self.data_dict = self._flatten_dicts(self.data_dict)
        #self.data_dict['context']=re.sub(' ',result[0])
        self.data_dict['context']= result
        #print(self.data_dict)

        return self.data_dict # 반환값 -> 딕셔너리