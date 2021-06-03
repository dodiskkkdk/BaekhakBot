from kocrawl.answerer.base_answerer import BaseAnswerer

class ChosunAnswerer(BaseAnswerer):

    def chosun_form(self, info: str, result: dict) -> str:
        """
        여행지 출력 포맷

        :param location: 지역
        :param place: 장소
        :param result: 데이터 딕셔너리
        :return: 출력 메시지
        """

        msg = self.chosun_init.format(info=info)

        #msg += '{info}의 자세한 정보는 해당 링크를 참조해주세요! {information}'.format(info=info, information=result['context'])
        msg += '{info}의 자세한 정보는 해당 링크를 참조해주세요! '

        msg = self._add_msg_from_dict(result, 'context', msg, '{information}')

        information = result['context']

        msg = msg.format(info=info,information=result['context'])

        return msg