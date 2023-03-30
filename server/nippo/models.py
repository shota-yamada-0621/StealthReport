# from accounts.models import CustomUser
from django.db import models


class Nippo(models.Model):
    
    updated_at = models.DateTimeField(auto_now=True, null=True)
    study_content = models.CharField(max_length=100, null=False)
    meeting_check = models.CharField(max_length=100, null=False)
    lessen_check = models.CharField(max_length=100, null=False)
    impressions = models.CharField(max_length=300, null=True)
    report_direction = models.CharField(max_length=40, null=True)
    select_date = models.DateTimeField(null=True)
    ai_check = models.CharField(max_length=100, null=True)

    class Meta:
        verbose_name_plural = 'Nippo'