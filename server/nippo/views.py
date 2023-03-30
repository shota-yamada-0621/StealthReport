from django.views import generic
from django.views.generic.edit import FormView


class NippoIndex(generic.TemplateView):

    template_name = 'index.html'


# class NippoCreateSuccess(generic.TemplateView):

#     template_name = 'success.html'


# class CreateNippo(FormView):

#     form_class = NippoForm
#     template_name = 'form.html'
#     study_genre = None
#     lessen_bool = None
#     metting_bool = None
#     study_text = None

#     def form_valid(self, form):
#         data = form.cleaned_data

#         self.study_genre = data['study_genre']
#         self.metting_bool = data['metting_bool']
#         self.lessen_bool = data['lessen_bool']
#         self.study_text = data['study_text']
#         print(self.study_genre, self.metting_bool, self.lessen_bool, self.study_text)
#         return super().form_valid(form)

"""テンプレートにデータを渡す為には基本的にget_context_dataを使用していく。
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        data = {
            'study_genre': self.study_genre,
            'metting_bool': self.metting_bool,
            'lessen_bool': self.lessen_bool,
            'study_text': self.study_text,
        }
        context.updata(data)
        return context
"""
